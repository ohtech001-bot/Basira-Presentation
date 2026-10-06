import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface GoldLineRevealProps {
  visible: boolean;
  className?: string;
}

export function GoldLineReveal({ visible, className }: GoldLineRevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={clsx('gold-line-reveal', className)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scaleX: visible || reduceMotion ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : visible ? 1.1 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}
