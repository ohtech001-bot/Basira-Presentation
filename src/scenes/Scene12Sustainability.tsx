import { motion, useReducedMotion } from 'framer-motion';
import { BookOpenCheck, Boxes, Gamepad2, Rocket } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { timeline } from '../data/timeline';

const phaseIcons = [BookOpenCheck, Boxes, Gamepad2, Rocket];

export function Scene12Sustainability({ title, number }: SceneProps) {
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
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        />
      </div>
      <div className="timeline-phases story-enter">
        {timeline.map((phase, index) => {
          const Icon = phaseIcons[index];
          return (
            <CinematicReveal key={phase.id} visible className="timeline-phase">
              <div className="timeline-phase-top">
                <span className="story-eyebrow">
                  المرحلة {String(phase.number).padStart(2, '0')}
                </span>
                <Icon size={72} strokeWidth={1.1} />
              </div>
              <span className="timeline-point" aria-hidden="true">
                {phase.number}
              </span>
              <div className="timeline-phase-bottom">
                <h2>{phase.label}</h2>
                <p>{phase.duration}</p>
              </div>
            </CinematicReveal>
          );
        })}
      </div>
      <div className="timeline-continuous">
        <span />
        تطوير مستمر يحافظ على جودة التجربة
      </div>
    </ProductScene>
  );
}
