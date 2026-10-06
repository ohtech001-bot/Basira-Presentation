import { motion, useReducedMotion } from 'framer-motion';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { AnimatedText } from '../components/animations/AnimatedText';
import { ParallaxImage } from '../components/animations/ParallaxImage';
import { LandmarkPlaceholder } from '../components/aqsa/LandmarkPlaceholder';
import type { SceneProps } from '../types/presentation';
import { uiAssets } from '../data/uiAssets';

export function Scene01Opening({ currentStep, title }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <SceneFrame className="opening-scene" label={title}>
      <motion.div
        className="opening-visual"
        initial={false}
        animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.8, ease: 'easeInOut' }}
        aria-hidden={currentStep < 1}
      >
        <ParallaxImage
          src={uiAssets.qaytbay.src}
          alt="صورة المعلم المختار للسؤال الافتتاحي"
          active={currentStep >= 1}
          className="opening-image"
          zoomScale={1.025}
          fallback={<LandmarkPlaceholder />}
        />
        <div className="opening-image-shade" />
        <div className="opening-vignette" />
        <div className="opening-visual-corner" aria-hidden="true" />
      </motion.div>

      <div className="opening-copy">
        <AnimatedText visible={currentStep >= 2} className="opening-question-label">
          <span className="scene-eyebrow">
            <i aria-hidden="true" />
            لحظة اكتشاف
          </span>
        </AnimatedText>
        <motion.h1
          className="opening-primary-question"
          initial={false}
          animate={{
            opacity: currentStep >= 2 ? (currentStep >= 3 ? 0.45 : 1) : 0,
            y: currentStep >= 2 ? 0 : 24,
            fontSize: currentStep >= 3 ? 62 : 112,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={currentStep < 2}
        >
          هل تعرف
          <br />
          هذا المعلم؟
        </motion.h1>
        <AnimatedText visible={currentStep >= 3} className="opening-location-question">
          <h2>
            وهل تعرف أين يقع
            <br />
            داخل المسجد الأقصى
            <br />
            <span>المبارك؟</span>
          </h2>
        </AnimatedText>
      </div>

      <motion.div
        className="opening-bottom-rule"
        initial={false}
        animate={{ opacity: currentStep >= 2 ? 1 : 0, scaleX: currentStep >= 2 ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.1 }}
        aria-hidden="true"
      />
    </SceneFrame>
  );
}
