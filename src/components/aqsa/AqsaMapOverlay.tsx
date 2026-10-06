import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Map } from 'lucide-react';

export interface AqsaMapOverlayProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

/** A composition surface only. No invented geographic positions or site plan. */
export function AqsaMapOverlay({
  children,
  title = 'مساحة لخريطة موثّقة',
  className,
}: AqsaMapOverlayProps) {
  return (
    <div className={clsx('aqsa-map-overlay', className)} aria-label={title}>
      <div className="aqsa-map-overlay__guide" aria-hidden="true" />
      {children || (
        <div className="aqsa-map-overlay__placeholder">
          <Map size={56} strokeWidth={0.8} aria-hidden="true" />
          <h3>{title}</h3>
          <p>أضف خريطة معتمدة، ثم حدّد مواقع المعالم اعتمادًا عليها.</p>
        </div>
      )}
      <span className="aqsa-map-overlay__caption">مساحة تجهيزية · لا تمثّل مخططًا جغرافيًا</span>
    </div>
  );
}
