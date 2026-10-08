import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import clsx from 'clsx';

export interface CounterProps {
  value: number;
  visible: boolean;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  locale?: string;
}

export function Counter({
  value,
  visible,
  from = 0,
  duration = 0.65,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  locale = 'ar',
}: CounterProps) {
  const reduceMotion = useReducedMotion();
  const target = Number.isFinite(value) ? value : 0;
  const origin = Number.isFinite(from) ? from : 0;
  const [display, setDisplay] = useState(origin);
  const progress = useRef({ number: origin });

  useEffect(() => {
    const tween = gsap.to(progress.current, {
      number: visible ? target : origin,
      duration: reduceMotion || !visible ? 0 : Math.max(0, duration),
      ease: 'power2.out',
      onUpdate: () => setDisplay(progress.current.number),
    });
    return () => {
      tween.kill();
    };
  }, [visible, target, origin, duration, reduceMotion]);

  const precision = Math.min(20, Math.max(0, Math.floor(decimals)));
  const format = new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return (
    <span className={clsx('number-counter', className)} aria-hidden={!visible}>
      <span className="sr-only">
        {prefix}
        {format.format(target)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {format.format(display)}
        {suffix}
      </span>
    </span>
  );
}
