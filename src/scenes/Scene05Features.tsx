import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Compass, Footprints } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const supporting = [
  { asset: uiAssets.exploration, label: 'بطاقة المعلم داخل التجوّل', icon: Footprints },
  { asset: uiAssets.tours, label: 'جولات تربط المعالم بقصصها', icon: Compass },
  { asset: uiAssets.library, label: 'مكتبة معرفية تفتح آفاقًا أخرى', icon: BookOpen },
];

export function Scene05Features({ currentStep, title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="المكان، تفاصيله، وقصته… في تجربة واحدة"
      className="landmark-showcase-scene"
    >
      <div className="landmark-showcase-layout">
        <div className="landmark-showcase-main">
          <motion.div
            className="product-screen landmark-showcase-hero"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.9 }}
          >
            <motion.div
              className="landmark-showcase-image"
              initial={{ scale: 1.025 }}
              animate={{ scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 1.5 }}
            >
              <UiImage asset={uiAssets.landmark} fit="contain" />
            </motion.div>
          </motion.div>
          <div className="product-caption landmark-showcase-caption">
            <span>قبة الصخرة</span>
            <small>صور تفصيلية · بطاقة معلومات · موقع المعلم</small>
          </div>
        </div>
        <div className="landmark-supporting">
          {supporting.map(({ asset, label, icon: Icon }, index) => (
            <motion.figure
              key={asset.id}
              className="landmark-support-card"
              initial={false}
              animate={{
                opacity: currentStep >= index + 1 ? 1 : 0,
                x: currentStep >= index + 1 ? 0 : -30,
              }}
              transition={{ duration: reducedMotion ? 0 : 0.65 }}
              aria-hidden={currentStep < index + 1}
            >
              {currentStep >= index + 1 && (
                <div className="landmark-support-image">
                  <UiImage asset={asset} fit="contain" />
                </div>
              )}
              <figcaption>
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </ProductScene>
  );
}
