import clsx from 'clsx';
import { CinematicReveal } from '../animations/CinematicReveal';
import { GoldLabel } from './GoldLabel';

export interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  visible?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  eyebrow,
  subtitle,
  visible = true,
  className,
}: SectionTitleProps) {
  return (
    <CinematicReveal visible={visible} className={clsx('section-title', className)}>
      {eyebrow && <GoldLabel>{eyebrow}</GoldLabel>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </CinematicReveal>
  );
}
