import type { ReactNode } from 'react';
import clsx from 'clsx';

interface SceneFrameProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function SceneFrame({ children, className, label }: SceneFrameProps) {
  return (
    <section className={clsx('scene-frame', className)} aria-label={label}>
      {children}
    </section>
  );
}
