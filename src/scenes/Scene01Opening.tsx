import { motion, useReducedMotion } from 'framer-motion';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

export function Scene01Opening({ title }: SceneProps) {
  const reduced = useReducedMotion();
  return (
    <SceneFrame className="deck-opening" label={title}>
      <div className="deck-opening-glow" aria-hidden="true" />
      <motion.figure
        className="deck-opening-photo"
        initial={reduced ? false : { opacity: 0, scale: 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.7 }}
      >
        <UiImage
          asset={uiAssets.qaytbay}
          alt="صورة المعلم المختار للسؤال الافتتاحي"
          fit="contain"
        />
        <i className="deck-photo-corner deck-photo-corner--top" aria-hidden="true" />
        <i className="deck-photo-corner deck-photo-corner--bottom" aria-hidden="true" />
      </motion.figure>
      <motion.div
        className="deck-opening-copy"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5 }}
      >
        <span className="deck-eyebrow">
          <i /> لِنبدأ بسؤال
        </span>
        <h1>
          هل تعرف
          <br />
          <em>هذا المعلم؟</em>
        </h1>
        <div className="deck-opening-rule" />
        <h2>
          وهل تعرف أين يقع
          <br />
          داخل المسجد الأقصى المبارك؟
        </h2>
      </motion.div>
      <span className="deck-opening-footer">بصيرة · رحلة اكتشاف</span>
    </SceneFrame>
  );
}
