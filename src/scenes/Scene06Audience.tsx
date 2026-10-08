import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const landmarks = ['قبة الصخرة', 'المسجد القبلي', 'المصلى المرواني', 'باب الرحمة', 'سبيل قايتباي'];

export function Scene06Audience({ title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تعرّف إلى المعالم… واربطها بالمكان"
      className="basira-s06"
    >
      <div className="s06-layout">
        <motion.figure
          className="s06-map"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
        >
          <div className="product-screen s06-map-screen">
            {/* The supplied image includes its own labels; do not invent geographic pins. */}
            <UiImage asset={uiAssets.map} fit="contain" />
          </div>
          <figcaption>خريطة المنظومة كما تظهر داخل تجربة بصيرة</figcaption>
        </motion.figure>
        <motion.aside
          className="s06-aside"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.12 }}
        >
          <h2>
            كل معلم له <em>مكان وقصة.</em>
          </h2>
          <ul className="s06-landmarks">
            {landmarks.map((landmark) => (
              <li key={landmark}>
                <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                {landmark}
              </li>
            ))}
          </ul>
          <figure className="s06-photo">
            <div>
              <UiImage asset={uiAssets.mission} fit="contain" />
            </div>
            <figcaption>المهمة الحالية: سبيل قايتباي</figcaption>
          </figure>
        </motion.aside>
      </div>
    </ProductScene>
  );
}
