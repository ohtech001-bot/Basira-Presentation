import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface CinematicRevealProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Brief entrance motion; complete slides never wait for manual reveal steps. */
export function CinematicReveal({ visible, children, className, delay = 0 }: CinematicRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx('cinematic-reveal', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: reduceMotion ? 0 : visible ? 0 : 12,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: visible && !reduceMotion ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!visible}
      inert={!visible}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  );
}
