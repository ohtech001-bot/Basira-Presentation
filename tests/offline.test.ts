import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  buildOfflinePresentation,
  readEmbeddedImageManifest,
  verifyOfflinePresentation,
} from '../scripts/build-offline.mjs';
import { getUiAssetUrl, isOfflinePresentation } from '../src/utils/offlineAssets.ts';
import { createOfflineDownloadMiddleware } from '../scripts/offlineDownloadMiddleware.ts';

function downloadResponse() {
  const headers = new Map<string, string | number>();
  let body: Buffer | string | undefined;
  const response = {
    statusCode: 200,
    setHeader: (name: string, value: string | number) => {
      headers.set(name, value);
    },
    end: (value?: Buffer | string) => {
      body = value;
    },
  };
  return { response, headers, body: () => body };
}

async function fixture(run: (projectDirectory: string) => Promise<void>) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'basira-offline-test-'));
  try {
    const ui = path.join(directory, 'dist', 'assets', 'ui');
    await mkdir(ui, { recursive: true });
    await writeFile(path.join(ui, 'معلم.jpeg'), Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
    await writeFile(path.join(ui, 'screen.webp'), Buffer.from('RIFF-test-image-WEBP'));
    await writeFile(
      path.join(directory, 'dist', 'index.html'),
      '<!doctype html><html lang="ar" dir="rtl"><head><title>بصيرة</title>' +
        '<script type="module" crossorigin src="/Basira-Presentation/assets/app.js"></script>' +
        '<link rel="stylesheet" crossorigin href="/Basira-Presentation/assets/app.css">' +
        '</head><body><div id="root"></div></body></html>',
    );
    await writeFile(
      path.join(directory, 'dist', 'assets', 'app.js'),
      'window.picture = window.__BASIRA_OFFLINE_ASSETS__["معلم.jpeg"]; window.caption = "</script>"; window.literal = "$&";',
    );
    await writeFile(path.join(directory, 'dist', 'assets', 'app.css'), 'body { color: #fff; }');
    await run(directory);
  } finally {
    // Only remove the test directory allocated directly inside the operating-system temp folder.
    assert.equal(path.dirname(directory), path.resolve(os.tmpdir()));
    assert.ok(path.basename(directory).startsWith('basira-offline-test-'));
    await rm(directory, { recursive: true, force: true });
  }
}

test('a portable HTML embeds every image and production code under a GitHub Pages base path', async () => {
  await fixture(async (projectDirectory) => {
    const result = await buildOfflinePresentation({ projectDirectory });
    assert.equal(result.images, 2);
    const html = await readFile(result.file, 'utf8');
    const images = readEmbeddedImageManifest(html);
    assert.equal(images['معلم.jpeg'], 'data:image/jpeg;base64,/9j/2Q==');
    assert.equal(
      images['screen.webp'],
      `data:image/webp;base64,${Buffer.from('RIFF-test-image-WEBP').toString('base64')}`,
    );
    assert.ok(!html.includes('src="/Basira-Presentation/'));
    assert.ok(!html.includes('href="/Basira-Presentation/'));
    assert.ok(
      html.includes('window.caption = "<\\/script>";'),
      'Script text cannot terminate the HTML tag',
    );
    assert.ok(html.includes('body { color: #fff; }'));
    assert.ok(
      html.includes('window.literal = "$&";'),
      'Bundled JavaScript keeps literal replacement tokens',
    );
    assert.ok(
      html.indexOf('window.__BASIRA_OFFLINE_ASSETS__ =') < html.indexOf('window.picture ='),
    );
    assert.equal((await verifyOfflinePresentation({ projectDirectory })).sha256, result.sha256);
  });
});

test('an offline build rejects runtime chunks or CSS that would request another file', async () => {
  await fixture(async (projectDirectory) => {
    const extraScript = path.join(projectDirectory, 'dist', 'assets', 'extra.js');
    await writeFile(extraScript, 'export const extra = true;');
    await assert.rejects(buildOfflinePresentation({ projectDirectory }), /Extra JavaScript chunks/);
    await rm(extraScript);
    await writeFile(
      path.join(projectDirectory, 'dist', 'assets', 'app.css'),
      'body { background-image: url("./background.jpg"); }',
    );
    await assert.rejects(buildOfflinePresentation({ projectDirectory }), /Offline CSS resource/);
  });
});

test('the image resolver selects embedded bytes in offline mode and keeps regular URLs otherwise', () => {
  assert.equal(isOfflinePresentation(), false);
  assert.equal(
    getUiAssetUrl('قبة الصخرة.jpeg'),
    './assets/ui/%D9%82%D8%A8%D8%A9%20%D8%A7%D9%84%D8%B5%D8%AE%D8%B1%D8%A9.jpeg',
  );
  const browserWindow = {
    __BASIRA_OFFLINE__: true,
    __BASIRA_OFFLINE_ASSETS__: { 'قبة الصخرة.jpeg': 'data:image/jpeg;base64,/9j/2Q==' },
  };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: browserWindow });
  try {
    assert.equal(isOfflinePresentation(), true);
    assert.equal(getUiAssetUrl('قبة الصخرة.jpeg'), 'data:image/jpeg;base64,/9j/2Q==');
  } finally {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

test('the development download returns the exact portable HTML without Vite transformation', async () => {
  await fixture(async (projectDirectory) => {
    const { file } = await buildOfflinePresentation({ projectDirectory });
    const middleware = createOfflineDownloadMiddleware(file);
    const result = downloadResponse();
    await middleware(
      { url: '/downloads/Basira-Offline.html', method: 'GET' },
      result.response,
      () => assert.fail('The download must be handled before the app fallback'),
    );
    assert.equal(result.response.statusCode, 200);
    assert.equal(result.headers.get('Content-Type'), 'text/html; charset=utf-8');
    assert.equal(
      result.headers.get('Content-Disposition'),
      'attachment; filename="Basira-Offline.html"',
    );
    assert.deepEqual(result.body(), await readFile(file));
    assert.ok(!String(result.body()).includes('/@vite/client'));
    const head = downloadResponse();
    await middleware({ url: '/downloads/Basira-Offline.html', method: 'HEAD' }, head.response, () =>
      assert.fail('The HEAD request must be handled'),
    );
    assert.equal(head.response.statusCode, 200);
    assert.equal(head.body(), undefined);
    assert.equal(head.headers.get('Content-Length'), result.headers.get('Content-Length'));
  });
});

test('a missing local download explains the build step and unrelated requests pass through', async () => {
  await fixture(async (projectDirectory) => {
    const middleware = createOfflineDownloadMiddleware(path.join(projectDirectory, 'missing.html'));
    const result = downloadResponse();
    await middleware(
      { url: '/downloads/Basira-Offline.html', method: 'GET' },
      result.response,
      () => assert.fail('A missing build must not become the presentation page'),
    );
    assert.equal(result.response.statusCode, 503);
    assert.ok(String(result.body()).includes('npm run build'));
    let passed = false;
    await middleware({ url: '/', method: 'GET' }, downloadResponse().response, () => {
      passed = true;
    });
    assert.equal(passed, true);
  });
});
