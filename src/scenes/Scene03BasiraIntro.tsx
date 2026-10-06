import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Footprints, Lightbulb, Sparkles } from 'lucide-react';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { AnimatedText } from '../components/animations/AnimatedText';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { GoldLineReveal } from '../components/animations/GoldLineReveal';
import { BasiraMark } from '../components/ui/BasiraMark';
import type { SceneProps } from '../types/presentation';

const verbs = [
  { text: 'تجوّل', icon: Footprints },
  { text: 'اكتشف', icon: Compass },
  { text: 'تعلّم', icon: Lightbulb },
  { text: 'تحدَّ', icon: Sparkles },
];

export function Scene03BasiraIntro({ currentStep, title }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <SceneFrame className="basira-intro-scene" label={title}>
      <motion.div
        className="basira-intro-atmosphere"
        initial={false}
        animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.5 }}
        aria-hidden="true"
      >
        <svg className="basira-intro-arches" viewBox="0 0 1920 1080" fill="none">
          <path d="M343 1080V675C343 296 619 70 960 70S1577 296 1577 675V1080" />
          <path d="M410 1080V677C410 339 656 136 960 136S1510 339 1510 677V1080" />
          <path d="M476 1080V680C476 382 693 202 960 202S1444 382 1444 680V1080" />
          <path d="M541 1080V680C541 427 727 270 960 270S1379 427 1379 680V1080" />
        </svg>
        <div className="basira-intro-glow" />
      </motion.div>

      <div className="basira-intro-main">
        <GoldLineReveal visible={currentStep >= 1} className="basira-intro-gold-line" />
        <CinematicReveal visible={currentStep >= 2} delay={0.2} className="basira-intro-brand">
          <BasiraMark showWord={false} />
        </CinematicReveal>
        <CinematicReveal visible={currentStep >= 3} className="basira-intro-name">
          <h1>بصيرة</h1>
          <p>منظومة تفاعلية للتعريف بالمسجد الأقصى المبارك</p>
        </CinematicReveal>

        <div className="basira-intro-verbs" aria-hidden={currentStep < 4}>
          {verbs.map(({ text, icon: Icon }, index) => (
            <CinematicReveal
              key={text}
              visible={currentStep >= 4}
              className="basira-intro-verb"
              delay={index * 0.12}
            >
              <Icon aria-hidden="true" strokeWidth={1.25} />
              <span>{text}</span>
            </CinematicReveal>
          ))}
        </div>

        <AnimatedText visible={currentStep >= 5} className="basira-intro-statement">
          <h1>
            نحن لا نريد أن يقرأ المستخدم عن المسجد الأقصى فقط...
            <br />
            <strong>نريده أن يدخله ويكتشفه.</strong>
          </h1>
        </AnimatedText>
      </div>
    </SceneFrame>
  );
}
