import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import clsx from 'clsx';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
  delay?: number;
  tilt?: boolean;
}

export function GlassCard({
  children,
  className,
  visible = true,
  delay = 0,
  tilt = false,
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 75, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 75, damping: 22 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!tilt || reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
    tiltX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -4);
  }

  function reset() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      className={clsx('glass-card', className)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible || reduceMotion ? 0 : 28 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: visible && !reduceMotion ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1400,
      }}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-hidden={!visible}
      inert={!visible}
    >
      {children}
    </motion.div>
  );
}
