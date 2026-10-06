import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface PageFlipProps {
  front: ReactNode;
  back: ReactNode;
  flipped: boolean;
  className?: string;
}

/** A controlled RTL two-face page: no dependency on pointer gestures or canvas. */
export function PageFlip({ front, back, flipped, className }: PageFlipProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={clsx('page-flip', { 'page-flip--turned': flipped }, className)} dir="rtl">
      <motion.div
        className="page-flip__leaf"
        initial={false}
        animate={{ rotateY: flipped ? -180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.45, 0, 0.15, 1] }}
      >
        <div
          className="page-flip__face page-flip__face--front"
          aria-hidden={flipped}
          inert={flipped}
          style={{ pointerEvents: flipped ? 'none' : 'auto' }}
        >
          {front}
        </div>
        <div
          className="page-flip__face page-flip__face--back"
          aria-hidden={!flipped}
          inert={!flipped}
          style={{ pointerEvents: flipped ? 'auto' : 'none' }}
        >
          {back}
        </div>
      </motion.div>
      <div className="page-flip__spine" aria-hidden="true" />
    </div>
  );
}
