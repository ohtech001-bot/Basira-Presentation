import type { ReactNode } from 'react';
import clsx from 'clsx';

export interface GoldLabelProps {
  children: ReactNode;
  className?: string;
}

export function GoldLabel({ children, className }: GoldLabelProps) {
  return <span className={clsx('gold-label', className)}>{children}</span>;
}
