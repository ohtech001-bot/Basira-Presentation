import { motion, useReducedMotion } from 'framer-motion';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

export function Scene05Features({ title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const supporting = [
    { asset: uiAssets.dome, label: 'قبة الصخرة · تفاصيل وقصة' },
    { asset: uiAssets.tours, label: 'الجولات التعليمية · مسارات مترابطة' },
    { asset: uiAssets.library, label: 'المكتبة المعرفية · محتوى موثوق' },
  ];

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="المكان، تفاصيله، وقصته… في تجربة واحدة"
      className="basira-s05"
    >
      <div className="s05-layout">
        <motion.figure
          className="s05-hero"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
        >
          <div className="product-screen s05-hero-screen">
            <UiImage asset={uiAssets.landmark} fit="contain" />
          </div>
          <figcaption>
            <strong>سبيل قايتباي</strong>
            <span>صور تفصيلية · بطاقة معلومات · موقع المعلم</span>
          </figcaption>
        </motion.figure>
        <div className="s05-supporting">
          {supporting.map(({ asset, label }, index) => (
            <motion.figure
              key={asset.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion ? 0 : index * 0.06,
              }}
            >
              <div className="product-screen s05-support-screen">
                <UiImage asset={asset} fit="contain" />
              </div>
              <figcaption>{label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </ProductScene>
  );
}
