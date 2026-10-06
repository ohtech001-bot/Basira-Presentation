import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface CinematicRevealProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Controlled reveals return to their hidden state when the presenter goes back. */
export function CinematicReveal({ visible, children, className, delay = 0 }: CinematicRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx('cinematic-reveal', className)}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: reduceMotion ? 0 : visible ? 0 : 24,
        scale: reduceMotion ? 1 : visible ? 1 : 0.985,
        filter: reduceMotion ? 'none' : visible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{
        duration: reduceMotion ? 0 : visible ? 0.85 : 0.3,
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
