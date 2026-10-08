import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Footprints, LogIn, Map, MapPin, MousePointer2, Trophy } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const journey = [
  { label: 'الدخول', icon: LogIn },
  { label: 'الخريطة', icon: Map },
  { label: 'التجول', icon: Footprints },
  { label: 'الوصول إلى المعلم', icon: MapPin },
  { label: 'الضغط عليه', icon: MousePointer2 },
  { label: 'قراءة المعلومات', icon: BookOpen },
  { label: 'اختبار أو تحدي', icon: Trophy },
];

export function Scene04HowItWorks({ title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const entrance = {
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.45 },
  };

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="رحلة متصلة… من أول دخول إلى اكتشاف جديد"
      className="basira-s04"
    >
      <motion.div className="s04-gallery" {...entrance}>
        <figure className="s04-main">
          <div className="product-screen s04-main-screen">
            <UiImage asset={uiAssets.exploration} fit="contain" />
          </div>
          <figcaption>تجوّل داخل المحاكاة، واقترب من المعلم</figcaption>
        </figure>
        <div className="s04-supporting">
          <figure>
            <div className="product-screen s04-support-screen">
              <UiImage asset={uiAssets.map} fit="contain" />
            </div>
            <figcaption>اختر وجهتك من الخريطة</figcaption>
          </figure>
          <figure>
            <div className="product-screen s04-support-screen">
              <UiImage asset={uiAssets.landmark} fit="contain" />
            </div>
            <figcaption>افتح قصة المعلم ومعلوماته</figcaption>
          </figure>
        </div>
      </motion.div>
      <motion.ol
        className="s04-flow"
        {...entrance}
        transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.12 }}
      >
        {journey.map(({ label, icon: Icon }, index) => (
          <li key={label}>
            <span className="s04-node">
              <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              <small>{String(index + 1).padStart(2, '0')}</small>
            </span>
            <span>{label}</span>
          </li>
        ))}
      </motion.ol>
    </ProductScene>
  );
}
