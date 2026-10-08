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
  const requiredText = {
    1: ['هل تعرف', 'هذا المعلم؟', 'وهل تعرف أين يقع'],
    2: ['سبيل قايتباي', 'معرفة محدودة بالمعالم', 'معلومات متفرقة وغير تفاعلية'],
    3: ['بصيرة', 'منظومة تفاعلية للتعريف بالمسجد الأقصى المبارك', 'نريده أن يدخله ويكتشفه'],
    8: ['المسابقة الجماعية', '320', '280'],
    11: ['الأهداف'],
    13: ['6,000', '300', 'العمل تطوعي'],
    14: ['محمد وجيه عمري', 'فيصل عدنان عمري', 'مجد مصالحة'],
    15: [
      'Interactive Simulation',
      'Schools',
      'Multiple Languages',
      'VR',
      'Global Access',
      'شاهد المكان، اكتشف معالمه، واعرف قصته.',
    ],
  };
  assert.equal(scenes.length, 15);
  assert.equal(new Set(scenes.map(({ id }) => id)).size, 15);
  const results = [];
  for (const scene of scenes) {
    assert.equal(scene.totalSteps, 1, `Slide ${scene.number} still requires extra clicks`);
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
      for (const text of requiredText[scene.number] ?? []) {
        assert.ok(
          markup.includes(text),
          `Missing first-entry content on slide ${scene.number}: ${text}`,
        );
      }
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
            fs.existsSync(path.join(process.cwd(), 'public', 'assets', 'ui', asset.servedFile)),
          );
        }
      }
      checkedSteps++;
    }
    results.push({ number: scene.number, title: scene.title, steps: scene.totalSteps });
  }
  const unusedAssets = Object.values(uiAssets)
    .filter((asset) => !usedAssets.has(asset.id))
    .map((asset) => asset.id);
  console.log(
    JSON.stringify(
      {
        scenes: results,
        checkedSteps,
        requiredNextClicks: scenes.length - 1,
        usedAssetCount: usedAssets.size,
        unusedAssets,
      },
      null,
      2,
    ),
  );
} finally {
  await server.close();
}
