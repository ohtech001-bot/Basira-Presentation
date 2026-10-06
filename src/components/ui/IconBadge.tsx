import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

export interface IconBadgeProps {
  icon?: LucideIcon;
  children?: ReactNode;
  className?: string;
}

export function IconBadge({ icon: Icon, children, className }: IconBadgeProps) {
  return (
    <span className={clsx('icon-badge', className)}>
      {Icon && <Icon size={32} strokeWidth={1.25} aria-hidden="true" />}
      {children}
    </span>
  );
}
