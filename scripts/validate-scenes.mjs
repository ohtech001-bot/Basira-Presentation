import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

// Component integration checks use Vite's SSR module loader without opening a browser.
const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { scenes } = await server.ssrLoadModule('/src/config/scenes.ts');
  const { uiAssets } = await server.ssrLoadModule('/src/data/uiAssets.ts');
  const usedAssets = new Set();
  let checkedSteps = 0;
  assert.equal(scenes.length, 15);
  assert.equal(new Set(scenes.map(({ id }) => id)).size, 15);
  const results = [];
  for (const scene of scenes) {
    assert.ok(scene.totalSteps >= 1);
    for (let step = 0; step < scene.totalSteps; step++) {
      const markup = renderToStaticMarkup(
        createElement(scene.component, {
          id: scene.id,
          title: scene.title,
          number: scene.number,
          totalSteps: scene.totalSteps,
          currentStep: step,
          onStepChange: () => {},
        }),
      );
      assert.ok(
        !markup.includes('مشهد قيد الإعداد'),
        `Scene ${scene.number} still uses a scaffold`,
      );
      assert.ok(
        !markup.includes('الهيكل جاهز لإضافة المحتوى'),
        `Scene ${scene.number} still uses a scaffold`,
      );
      if (scene.number === 1)
        assert.ok(!markup.includes('سبيل قايتباي'), 'Opening reveals the answer');
      if (scene.number === 8 && step === scene.totalSteps - 1) {
        assert.ok(markup.includes('المسابقة الجماعية'));
        assert.ok(markup.includes('320') && markup.includes('280'));
      }
      for (const asset of Object.values(uiAssets)) {
        if (markup.includes(asset.src)) {
          usedAssets.add(asset.id);
          assert.ok(
            fs.existsSync(path.join(process.cwd(), 'public', 'assets', 'ui', asset.sourceFile)),
          );
        }
      }
      checkedSteps++;
    }
    results.push({ number: scene.number, title: scene.title, steps: scene.totalSteps });
  }
  for (const asset of Object.values(uiAssets))
    assert.ok(usedAssets.has(asset.id), `Unused supplied image: ${asset.sourceFile}`);
  console.log(
    JSON.stringify({ scenes: results, checkedSteps, usedAssetCount: usedAssets.size }, null, 2),
  );
} finally {
  await server.close();
}
