import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputName = 'Basira-Offline.html';
const imageTypes = {
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};
const digest = (buffer) => createHash('sha256').update(buffer).digest('hex');
const attribute = (tag, name) =>
  tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2];

function localBuiltFile(directory, reference) {
  assert.ok(!/^(?:https?:)?\/\//i.test(reference), 'The production build must use local files');
  const pathname = decodeURIComponent(new URL(reference, 'https://build.invalid/').pathname);
  const assetOffset = pathname.lastIndexOf('/assets/');
  assert.ok(assetOffset >= 0, `Expected a Vite asset: ${reference}`);
  const resolved = path.resolve(directory, pathname.slice(assetOffset + 1));
  const relative = path.relative(directory, resolved);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
  return resolved;
}

function escapeClosingTag(content, tag) {
  return content.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`);
}

async function imageManifest(directory) {
  const files = (await readdir(directory))
    .filter((file) => path.extname(file).toLowerCase() in imageTypes)
    .sort();
  assert.ok(files.length > 0, 'The presentation images must be present in dist/assets/ui');
  const entries = await Promise.all(
    files.map(async (file) => {
      const bytes = await readFile(path.join(directory, file));
      const type = imageTypes[path.extname(file).toLowerCase()];
      return [file, `data:${type};base64,${bytes.toString('base64')}`];
    }),
  );
  return Object.fromEntries(entries);
}

export function readEmbeddedImageManifest(html) {
  const json = html.match(
    /window\.__BASIRA_OFFLINE_ASSETS__\s*=\s*(\{[\s\S]*?\});\s*<\/script>/,
  )?.[1];
  assert.ok(json, 'The offline image manifest is embedded before the application');
  return JSON.parse(json);
}

export async function verifyOfflinePresentation(options = {}) {
  const directory = path.join(options.projectDirectory ?? projectDirectory, 'dist');
  const output = path.join(directory, 'downloads', outputName);
  const html = await readFile(output, 'utf8');
  // Script strings may contain HTML examples. Check resource tags only outside raw-text bodies.
  const rawTextPattern = /<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  const rawTextBlocks = [...html.matchAll(rawTextPattern)];
  const documentMarkup = html.replace(rawTextPattern, '<$1$2></$1>');
  assert.ok(html.includes('window.__BASIRA_OFFLINE__ = true;'), 'Offline mode is enabled');
  assert.ok(html.includes('__BASIRA_OFFLINE_ASSETS__'), 'The bundle reads embedded images');
  assert.ok(!/<script\b[^>]*\bsrc\s*=/i.test(documentMarkup), 'No external JavaScript is required');
  assert.ok(
    !/<link\b[^>]*\b(?:href|rel)\s*=/i.test(documentMarkup),
    'No external stylesheet or preload is required',
  );
  assert.ok(!/<(?:img|audio|video|iframe)\b[^>]*\bsrc\s*=\s*["'](?!data:)/i.test(documentMarkup));
  const manifest = readEmbeddedImageManifest(html);
  const expected = await imageManifest(path.join(directory, 'assets', 'ui'));
  assert.deepEqual(Object.keys(manifest).sort(), Object.keys(expected).sort());
  for (const [file, dataUrl] of Object.entries(expected)) {
    assert.equal(manifest[file], dataUrl, `Embedded image is complete and unchanged: ${file}`);
  }
  const runtimeScripts = rawTextBlocks.filter(
    ([, tag, attributes]) =>
      tag.toLowerCase() === 'script' && attribute(attributes, 'type') === 'module',
  );
  assert.equal(runtimeScripts.length, 1, 'The application is one complete inline module');
  assert.ok(
    runtimeScripts[0][3].includes('__BASIRA_OFFLINE_ASSETS__'),
    'The application resolves its images from the embedded manifest',
  );
  assert.ok(
    !/\bimport\s*\(/.test(runtimeScripts[0][3]),
    'The inline module must have no external static or dynamic imports',
  );
  // Parse without executing. A complete standalone bundle needs no module imports or extra files.
  new Script(runtimeScripts[0][3], { filename: 'Basira-Offline.js' });
  const productionHtml = await readFile(path.join(directory, 'index.html'), 'utf8');
  const productionScriptTag = productionHtml.match(
    /<script\b[^>]*\bsrc\s*=[^>]*>[\s\S]*?<\/script>/i,
  )?.[0];
  const productionScriptReference = productionScriptTag && attribute(productionScriptTag, 'src');
  assert.ok(productionScriptReference);
  const productionJavascript = await readFile(
    localBuiltFile(directory, productionScriptReference),
    'utf8',
  );
  assert.equal(
    runtimeScripts[0][3],
    escapeClosingTag(productionJavascript, 'script'),
    'The complete production JavaScript is retained intact',
  );
  const styles = rawTextBlocks.filter(([, tag]) => tag.toLowerCase() === 'style');
  const productionStyleTags = [...productionHtml.matchAll(/<link\b[^>]*>/gi)].filter(
    ([tag]) => attribute(tag, 'rel')?.toLowerCase() === 'stylesheet',
  );
  assert.equal(
    styles.length,
    productionStyleTags.length,
    'All production stylesheets are embedded',
  );
  for (const [index, [, , , css]] of styles.entries()) {
    const cssReference = attribute(productionStyleTags[index][0], 'href');
    assert.ok(cssReference);
    const productionCss = await readFile(localBuiltFile(directory, cssReference), 'utf8');
    assert.equal(
      css,
      escapeClosingTag(productionCss, 'style'),
      'The complete stylesheet is retained intact',
    );
    assert.ok(!/@import\b/i.test(css), 'No font or stylesheet imports');
    for (const [, , url] of css.matchAll(/url\(\s*(["']?)([^)]*)\)/gi)) {
      assert.ok(
        url.startsWith('data:') || url.startsWith('#'),
        `Offline CSS resource: ${url.slice(0, 80)}`,
      );
    }
  }
  const bytes = (await stat(output)).size;
  return {
    file: output,
    images: Object.keys(manifest).length,
    bytes,
    sha256: digest(Buffer.from(html)),
  };
}

export async function buildOfflinePresentation(options = {}) {
  const directory = path.join(options.projectDirectory ?? projectDirectory, 'dist');
  let html = await readFile(path.join(directory, 'index.html'), 'utf8');
  const scriptTags = [...html.matchAll(/<script\b[^>]*\bsrc\s*=[^>]*>[\s\S]*?<\/script>/gi)];
  assert.equal(scriptTags.length, 1, 'A single bundled application entry is required');
  const scriptTag = scriptTags[0][0];
  const scriptReference = attribute(scriptTag, 'src');
  assert.ok(scriptReference);
  const bundledScripts = (await readdir(path.join(directory, 'assets'))).filter((file) =>
    /\.m?js$/i.test(file),
  );
  assert.equal(
    bundledScripts.length,
    1,
    'Extra JavaScript chunks would require a network or file request',
  );
  const javascript = await readFile(localBuiltFile(directory, scriptReference), 'utf8');
  assert.ok(
    javascript.includes('__BASIRA_OFFLINE_ASSETS__'),
    'Build the application with its offline asset resolver first',
  );
  const styleTags = [...html.matchAll(/<link\b[^>]*>/gi)].filter(
    ([tag]) => attribute(tag, 'rel')?.toLowerCase() === 'stylesheet',
  );
  assert.ok(styleTags.length > 0, 'The presentation stylesheet must be bundled');
  for (const [tag] of styleTags) {
    const reference = attribute(tag, 'href');
    assert.ok(reference);
    const css = await readFile(localBuiltFile(directory, reference), 'utf8');
    html = html.replace(tag, () => `<style>${escapeClosingTag(css, 'style')}</style>`);
  }
  const manifest = await imageManifest(path.join(directory, 'assets', 'ui'));
  const safeJson = JSON.stringify(manifest).replace(/</g, '\\u003c');
  const offlineBootstrap = `<script id="basira-offline-assets">\nwindow.__BASIRA_OFFLINE__ = true;\nwindow.__BASIRA_OFFLINE_ASSETS__ = ${safeJson};\n</script>`;
  const inlineApplication = `<script type="module">${escapeClosingTag(javascript, 'script')}</script>`;
  // A callback preserves literal $& / $` sequences present in the React bundle.
  html = html.replace(scriptTag, () => `${offlineBootstrap}\n${inlineApplication}`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>بصيرة | العرض الكامل دون إنترنت</title>');
  const destination = path.join(directory, 'downloads');
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, outputName), html, 'utf8');
  return verifyOfflinePresentation(options);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = process.argv.includes('--verify')
    ? await verifyOfflinePresentation()
    : await buildOfflinePresentation();
  console.log(
    `Offline presentation: ${result.images} embedded images, ${(result.bytes / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(result.file);
}
