import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface ImageMaskRevealProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageMaskReveal({ visible, children, className, delay = 0 }: ImageMaskRevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={clsx('image-mask-reveal', className)}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        clipPath: visible || reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay: visible && !reduceMotion ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!visible}
      inert={!visible}
    >
      {children}
    </motion.div>
  );
}
