import type { ReactNode } from 'react';
import { SceneFrame } from './SceneFrame';
import { BasiraMark } from '../ui/BasiraMark';

interface ProductSceneProps {
  title: string;
  number: number;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ProductScene({
  title,
  number,
  subtitle,
  children,
  className = '',
}: ProductSceneProps) {
  return (
    <SceneFrame className={`product-scene ${className}`} label={title}>
      <div className="product-atmosphere" aria-hidden="true" />
      <header className="product-heading">
        <span className="product-kicker">
          <i /> تجربة بصيرة <b>{String(number).padStart(2, '0')}</b>
        </span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <BasiraMark className="product-brand" showWord={false} />
      <div className="product-body">{children}</div>
    </SceneFrame>
  );
}
