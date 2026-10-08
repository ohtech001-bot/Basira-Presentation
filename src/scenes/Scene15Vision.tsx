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

export function Scene15Vision({ title }: SceneProps) {
  const reduceMotion = useReducedMotion();
  return (
    <SceneFrame label={title} className="story-vision">
      <div className="vision-atmosphere" aria-hidden="true" />
      <div className="vision-content story-enter">
        <header className="vision-heading">
          <span className="story-eyebrow">الرؤية المستقبلية</span>
          <h1 aria-label="نحو منصة رقمية تعليمية متكاملة للتعريف بالمسجد الأقصى المبارك.">
            نحو منصة رقمية تعليمية متكاملة
            <br />
            للتعريف بالمسجد الأقصى المبارك.
          </h1>
        </header>
        <CinematicReveal visible className="vision-closing">
          <BasiraMark className="vision-logo" />
          <div className="vision-closing-line" />
          <p>شاهد المكان، اكتشف معالمه، واعرف قصته.</p>
        </CinematicReveal>
        <div className="vision-path">
          <div className="vision-path-base" aria-hidden="true" />
          <motion.div
            className="vision-path-line"
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            aria-hidden="true"
          />
          {future.map(({ english, arabic, icon: Icon }) => (
            <CinematicReveal key={english} visible className="vision-stop">
              <span className="vision-stop-icon">
                <Icon size={43} strokeWidth={1.1} />
              </span>
              <h2>{arabic}</h2>
              <p lang="en" dir="ltr">
                {english}
              </p>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
