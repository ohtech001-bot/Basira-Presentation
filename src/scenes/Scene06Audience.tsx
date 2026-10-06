import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Route } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

// Positions follow the labels already visible in the supplied aerial interface.
const landmarks = [
  { label: 'قبة الصخرة', x: 40.4, y: 43.6 },
  { label: 'المسجد القبلي', x: 25.1, y: 65.9 },
  { label: 'المصلى المرواني', x: 58.9, y: 68.4 },
  { label: 'باب الرحمة', x: 65.2, y: 32.7 },
];

export function Scene06Audience({ currentStep, title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تعرّف إلى المعالم… واربطها بالمكان"
      className="aerial-map-scene"
    >
      <div className="aerial-map-layout">
        <div className="product-screen aerial-map-screen">
          <div className="aerial-map-layer">
            <UiImage asset={uiAssets.map} fit="contain" />
            <svg
              className="aerial-route"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M25.1 65.9 Q29 44 40.4 43.6 T65.2 32.7"
                initial={false}
                animate={{
                  pathLength: currentStep >= 2 ? 1 : 0,
                  opacity: currentStep >= 2 ? 1 : 0,
                }}
                transition={{ duration: reducedMotion ? 0 : 1.4, ease: 'easeInOut' }}
              />
            </svg>
            {landmarks.map(({ label, x, y }, index) => (
              <motion.div
                key={label}
                className="aerial-landmark"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={false}
                animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 12 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : index * 0.1,
                }}
                aria-hidden={currentStep < 1}
              >
                <span className="aerial-landmark-dot" />
                <span className="aerial-landmark-label">{label}</span>
              </motion.div>
            ))}
            <motion.div
              className="aerial-route-label"
              initial={false}
              animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
              aria-hidden={currentStep < 2}
            >
              <Route size={19} aria-hidden="true" />
              مسار استكشاف توضيحي
            </motion.div>
          </div>
        </div>
        <aside className="aerial-map-aside">
          <span className="product-aside-label">من المشهد الجوي إلى تفاصيل المعلم</span>
          <h2>
            كل معلم
            <br />
            <em>له مكان وقصة.</em>
          </h2>
          <motion.div
            className="qaytbay-map-card"
            initial={false}
            animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 25 }}
            transition={{ duration: reducedMotion ? 0 : 0.7 }}
            aria-hidden={currentStep < 3}
          >
            {currentStep >= 3 && (
              <div className="qaytbay-map-photo">
                <UiImage asset={uiAssets.qaytbay} fit="contain" />
              </div>
            )}
            <div className="qaytbay-map-caption">
              <MapPin size={24} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>سبيل قايتباي</h3>
                <p>تبدأ المعرفة بالتعرّف إلى المعلم</p>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </ProductScene>
  );
}
