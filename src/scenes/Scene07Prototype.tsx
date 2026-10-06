import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, Check, CircleHelp, Sparkles, TrendingUp } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { Counter } from '../components/animations/Counter';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const milestones = [
  { label: 'سؤال', detail: 'ماذا تعرف عن المعلم؟', icon: CircleHelp },
  { label: 'إجابة', detail: 'المعرفة تصبح اختيارًا', icon: Check },
  { label: 'نقاط', detail: 'كل اكتشاف يضيف إلى رصيدك', icon: Sparkles },
  { label: 'تقدم', detail: 'تابع رحلتك في ملفك الشخصي', icon: TrendingUp },
  { label: 'إنجاز', detail: 'تحديات جديدة تنتظر الاكتشاف', icon: Award },
];

export function Scene07Prototype({ currentStep, title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const activeAsset =
    currentStep >= 5 ? uiAssets.progress : currentStep >= 4 ? uiAssets.profile : uiAssets.quiz;
  const duration = reducedMotion ? 0 : 0.65;
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="التعلم يتحول إلى تحدٍ"
      className="learning-challenge-scene"
    >
      <div className="learning-challenge-layout">
        <div className="learning-challenge-visual">
          <div className="product-screen learning-challenge-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAsset.id}
                className="learning-challenge-image"
                initial={{ opacity: 0, x: 35, scale: 1.02 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration }}
              >
                <UiImage asset={activeAsset} fit="contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="product-caption learning-challenge-caption">
            {activeAsset.title}
            <small>اكتشاف · معرفة · مشاركة</small>
          </div>
        </div>
        <div className="learning-challenge-aside">
          <ol className="learning-milestones">
            {milestones.map(({ label, detail, icon: Icon }, index) => (
              <motion.li
                key={label}
                className={currentStep === index + 1 ? 'is-current' : ''}
                initial={false}
                animate={{
                  opacity: currentStep >= index + 1 ? 1 : 0,
                  x: currentStep >= index + 1 ? 0 : -20,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
                aria-hidden={currentStep < index + 1}
              >
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{label}</h3>
                  <p>{detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <motion.div
            className="learning-points"
            initial={false}
            animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 20 }}
            transition={{ duration }}
            aria-hidden={currentStep < 3}
          >
            <Sparkles size={31} strokeWidth={1.3} aria-hidden="true" />
            <Counter value={240} visible={currentStep >= 3} locale="en" />
            <span>نقاط في هذا التحدي</span>
          </motion.div>
          <motion.div
            className="learning-achievement"
            initial={false}
            animate={{ opacity: currentStep >= 5 ? 1 : 0 }}
            transition={{ duration }}
            aria-hidden={currentStep < 5}
          >
            <Award size={24} aria-hidden="true" />
            إنجاز يفتح الباب إلى التحدي التالي
          </motion.div>
        </div>
      </div>
    </ProductScene>
  );
}
