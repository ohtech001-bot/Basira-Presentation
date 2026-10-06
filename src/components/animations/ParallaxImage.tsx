import { useState, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import clsx from 'clsx';

export interface ParallaxImageProps {
  src: string;
  alt: string;
  active: boolean;
  className?: string;
  fallback?: ReactNode;
  zoomScale?: number;
}

export function ParallaxImage({
  src,
  alt,
  active,
  className,
  fallback,
  zoomScale = 1.075,
}: ParallaxImageProps) {
  const reduceMotion = useReducedMotion();
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);
  const x = useSpring(xTarget, { stiffness: 50, damping: 30 });
  const y = useSpring(yTarget, { stiffness: 50, damping: 30 });
  const failed = !src || failedSource === src;
  const loaded = loadedSource === src;

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !active || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    xTarget.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -18);
    yTarget.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -12);
  }

  function reset() {
    xTarget.set(0);
    yTarget.set(0);
  }

  return (
    <motion.div
      className={clsx('parallax-image', className)}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : active ? 1.6 : 0.35 }}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-hidden={!active}
    >
      <motion.div
        className="parallax-image__depth"
        initial={false}
        animate={{ scale: active && !reduceMotion ? zoomScale : 1 }}
        transition={{ duration: reduceMotion ? 0 : active ? 10 : 0.5, ease: 'linear' }}
        style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      >
        {(failed || !loaded) && (
          <div className="parallax-image__fallback" role="img" aria-label={alt}>
            {fallback || (
              <div className="image-fallback-surface">
                <span>صورة المعلم</span>
              </div>
            )}
          </div>
        )}
        {!failed && (
          <motion.img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            className="parallax-image__asset"
            initial={false}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            onLoad={() => setLoadedSource(src)}
            onError={() => setFailedSource(src)}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
