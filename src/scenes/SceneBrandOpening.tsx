import { motion, useReducedMotion } from 'framer-motion';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { BasiraMark } from '../components/ui/BasiraMark';
import type { SceneProps } from '../types/presentation';

const words = ['تعلّم', 'استكشف', 'تنافس'];

export function SceneBrandOpening({ title }: SceneProps) {
  const reduced = useReducedMotion();
  return (
    <SceneFrame className="deck-brand-opening" label={title}>
      <motion.div
        className="deck-brand-opening-content"
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: 'easeOut' }}
      >
        <BasiraMark className="deck-brand-opening-logo" showWord={false} />
        <ul className="deck-brand-opening-words" aria-label="تعلّم، استكشف، تنافس">
          {words.map((word, index) => (
            <motion.li
              key={word}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.15 + index * 0.05 }}
            >
              {word}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </SceneFrame>
  );
}
