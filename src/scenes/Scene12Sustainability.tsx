import { motion, useReducedMotion } from 'framer-motion';
import { BookOpenCheck, Boxes, Gamepad2, Rocket } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { timeline } from '../data/timeline';

const phaseIcons = [BookOpenCheck, Boxes, Gamepad2, Rocket];

export function Scene12Sustainability({ currentStep, title, number }: SceneProps) {
  const reduceMotion = useReducedMotion();
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="مراحل واضحة… من المعرفة الموثوقة إلى تجربة متجددة"
      className="story-timeline"
    >
      <div className="timeline-track" aria-hidden="true">
        <div className="timeline-track-base" />
        <motion.div
          className="timeline-track-gold"
          initial={false}
          animate={{ scaleX: Math.min(1, currentStep / 4) }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="timeline-phases">
        {timeline.map((phase, index) => {
          const Icon = phaseIcons[index];
          return (
            <div
              key={phase.id}
              className={`timeline-phase ${currentStep >= phase.number ? 'is-visible' : ''}`}
            >
              <CinematicReveal visible={currentStep >= phase.number} className="timeline-phase-top">
                <span className="story-eyebrow">
                  المرحلة {String(phase.number).padStart(2, '0')}
                </span>
                <Icon size={58} strokeWidth={1.1} />
              </CinematicReveal>
              <span className="timeline-point" aria-hidden="true">
                {phase.number}
              </span>
              <CinematicReveal
                visible={currentStep >= phase.number}
                className="timeline-phase-bottom"
              >
                <h2>{phase.label}</h2>
                <p>{phase.duration}</p>
              </CinematicReveal>
            </div>
          );
        })}
      </div>
      <CinematicReveal visible={currentStep >= 4} className="timeline-continuous">
        <span />
        تطوير مستمر يحافظ على جودة التجربة
      </CinematicReveal>
    </ProductScene>
  );
}
