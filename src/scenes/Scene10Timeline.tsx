import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';

const prototypeFlow = [
  { asset: uiAssets.home, label: 'الواجهة الرئيسية' },
  { asset: uiAssets.map, label: 'الخريطة' },
  { asset: uiAssets.exploration, label: 'التجوّل' },
  { asset: uiAssets.landmark, label: 'بطاقة المعلم' },
  { asset: uiAssets.quiz, label: 'الاختبار' },
  { asset: uiAssets.competition, label: 'المسابقة الجماعية' },
];

export function Scene10Timeline({ currentStep, title, number, onStepChange }: SceneProps) {
  const reduceMotion = useReducedMotion();
  const activeIndex = Math.max(0, Math.min(prototypeFlow.length - 1, currentStep - 1));
  const active = prototypeFlow[activeIndex];
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="من الدخول إلى التجربة… وصولًا إلى المنافسة"
      className="story-prototype"
    >
      <div className="prototype-layout">
        <div className="prototype-story">
          <span className="story-eyebrow">النموذج الأولي · Prototype</span>
          <h2>
            بصيرة ليست مجرد فكرة...
            <br />
            <em>بدأنا بتحويلها إلى تجربة حقيقية.</em>
          </h2>
          <div className="prototype-chapter">
            <span dir="ltr">0{activeIndex + 1} / 06</span>
            <i />
            <p>{active.label}</p>
          </div>
          <p className="prototype-stage-caption">واجهات بصيرة الفعلية</p>
        </div>
        <div className="prototype-hero product-screen">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.asset.id}
              className="prototype-current"
              initial={{ opacity: 0, x: reduceMotion ? 0 : -35, scale: reduceMotion ? 1 : 1.035 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: reduceMotion ? 0 : 25, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <UiImage asset={active.asset} fit="contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="prototype-flow" aria-label="مراحل النموذج الأولي">
          {prototypeFlow.map(({ asset, label }, index) => (
            <button
              type="button"
              className={`prototype-stop ${index === activeIndex ? 'is-active' : ''} ${index < activeIndex ? 'is-past' : ''}`}
              key={asset.id}
              onClick={() => onStepChange(index + 1)}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              <span className="prototype-stop-number">
                {index < activeIndex ? <Check size={19} /> : String(index + 1).padStart(2, '0')}
              </span>
              <span>{label}</span>
              {index < prototypeFlow.length - 1 && <ArrowLeft size={21} aria-hidden="true" />}
            </button>
          ))}
        </nav>
      </div>
    </ProductScene>
  );
}
