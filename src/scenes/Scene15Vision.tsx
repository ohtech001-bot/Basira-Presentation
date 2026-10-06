import { motion, useReducedMotion } from 'framer-motion';
import { Gamepad2, School, Languages, Glasses, Globe2 } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { BasiraMark } from '../components/ui/BasiraMark';
import { CinematicReveal } from '../components/animations/CinematicReveal';

const future = [
  { english: 'Interactive Simulation', arabic: 'اليوم: المحاكاة التفاعلية', icon: Gamepad2 },
  { english: 'Schools', arabic: 'المدارس', icon: School },
  { english: 'Multiple Languages', arabic: 'لغات متعددة', icon: Languages },
  { english: 'VR', arabic: 'الواقع الافتراضي', icon: Glasses },
  { english: 'Global Access', arabic: 'وصول عالمي', icon: Globe2 },
];

export function Scene15Vision({ currentStep, title }: SceneProps) {
  const reduceMotion = useReducedMotion();
  const closing = currentStep >= 6;
  return (
    <SceneFrame label={title} className="story-vision">
      <div className="vision-atmosphere" aria-hidden="true" />
      <motion.div
        className="vision-content"
        initial={false}
        animate={{ opacity: closing ? 0 : 1, y: reduceMotion ? 0 : closing ? -35 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7 }}
        aria-hidden={closing}
        inert={closing}
      >
        <header className="vision-heading">
          <span className="story-eyebrow">الرؤية المستقبلية</span>
          <h1>
            نحو منصة رقمية تعليمية متكاملة
            <br />
            للتعريف بالمسجد الأقصى المبارك.
          </h1>
        </header>
        <div className="vision-path">
          <div className="vision-path-base" aria-hidden="true" />
          <motion.div
            className="vision-path-line"
            initial={false}
            animate={{ scaleX: Math.min(1, currentStep / 5) }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          {future.map(({ english, arabic, icon: Icon }, index) => (
            <CinematicReveal
              key={english}
              visible={currentStep >= index + 1}
              className="vision-stop"
            >
              <span className="vision-stop-icon">
                <Icon size={46} strokeWidth={1.1} />
              </span>
              <h2>{arabic}</h2>
              <p lang="en" dir="ltr">
                {english}
              </p>
            </CinematicReveal>
          ))}
        </div>
      </motion.div>
      <CinematicReveal visible={closing} className="vision-closing">
        <BasiraMark className="vision-logo" />
        <div className="vision-closing-line" />
        <p>شاهد المكان، اكتشف معالمه، واعرف قصته.</p>
      </CinematicReveal>
    </SceneFrame>
  );
}
