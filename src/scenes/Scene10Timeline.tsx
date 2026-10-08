import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

export function Scene10Timeline({ title, number }: SceneProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = prototypeFlow[activeIndex];

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="من الدخول إلى التجربة… وصولًا إلى المنافسة"
      className="story-prototype"
    >
      <div className="prototype-layout story-enter">
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
          <p className="prototype-stage-caption">واجهات المنظومة الفعلية</p>
        </div>
        <div className="prototype-hero product-screen">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.asset.id}
              className="prototype-current"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            >
              <UiImage asset={active.asset} fit="contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="prototype-flow" aria-label="معاينة اختيارية لواجهات النموذج الأولي">
          {prototypeFlow.map(({ asset, label }, index) => (
            <button
              type="button"
              key={asset.id}
              className={`prototype-stop ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <UiImage
                asset={asset}
                fit="contain"
                loading="lazy"
                className="prototype-stop-image"
                alt={label}
              />
              <span className="prototype-stop-label">
                <b>{String(index + 1).padStart(2, '0')}</b>
                <span>{label}</span>
              </span>
              {index < prototypeFlow.length - 1 && <ArrowLeft size={20} aria-hidden="true" />}
            </button>
          ))}
        </nav>
      </div>
    </ProductScene>
  );
}
