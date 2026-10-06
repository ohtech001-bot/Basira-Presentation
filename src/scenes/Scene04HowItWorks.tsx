import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Footprints, LogIn, Map, MapPin, MousePointer2, Trophy } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets, type UiAssetKey } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const journey: { label: string; description: string; asset: UiAssetKey; icon: typeof Map }[] = [
  { label: 'الدخول', description: 'ابدأ رحلتك من واجهة بصيرة', asset: 'home', icon: LogIn },
  { label: 'الخريطة', description: 'اختر معلمًا وابدأ الاستكشاف', asset: 'map', icon: Map },
  { label: 'التجول', description: 'انتقل داخل المحاكاة', asset: 'exploration', icon: Footprints },
  {
    label: 'الوصول إلى المعلم',
    description: 'اقترب من المكان واكتشف تفاصيله',
    asset: 'exploration',
    icon: MapPin,
  },
  {
    label: 'الضغط عليه',
    description: 'افتح بطاقة المعلم داخل التجربة',
    asset: 'exploration',
    icon: MousePointer2,
  },
  {
    label: 'قراءة المعلومات',
    description: 'شاهد الصور وتعرّف إلى القصة',
    asset: 'landmark',
    icon: BookOpen,
  },
  {
    label: 'اختبار أو تحدي',
    description: 'اختبر معرفتك وأكمل الرحلة',
    asset: 'quiz',
    icon: Trophy,
  },
];

export function Scene04HowItWorks({ currentStep, title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const active = Math.max(0, Math.min(journey.length - 1, currentStep - 1));
  const current = journey[active];
  const duration = reducedMotion ? 0 : 0.6;
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="من أول دخول… إلى اكتشاف جديد"
      className="journey-scene"
    >
      <div className="journey-layout">
        <div className="journey-visual">
          <div className="product-screen journey-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.asset}
                className="journey-image"
                initial={{ opacity: 0, x: 35, scale: 1.02 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration }}
              >
                <UiImage asset={uiAssets[current.asset]} fit="contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            key={current.label}
            className="product-caption journey-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
          >
            <span>{current.label}</span>
            <small>{current.description}</small>
          </motion.div>
        </div>
        <div className="journey-flow">
          <p className="product-aside-label">رحلة واحدة، خطوات مترابطة</p>
          <ol className="journey-steps">
            {journey.map(({ label, icon: Icon }, index) => (
              <motion.li
                key={label}
                className={index === active && currentStep > 0 ? 'is-current' : ''}
                initial={false}
                animate={{
                  opacity: currentStep >= index + 1 ? 1 : 0,
                  x: currentStep >= index + 1 ? 0 : -18,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
                aria-hidden={currentStep < index + 1}
              >
                <span className="journey-node">
                  <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span>{label}</span>
                <small>{String(index + 1).padStart(2, '0')}</small>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </ProductScene>
  );
}
