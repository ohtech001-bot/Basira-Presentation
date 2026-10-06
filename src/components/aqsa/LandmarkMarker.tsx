import clsx from 'clsx';
import { MapPin } from 'lucide-react';

export interface LandmarkMarkerProps {
  label: string;
  number?: number;
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

/** The caller supplies location/layout after a verified map is available. */
export function LandmarkMarker({
  label,
  number,
  active = false,
  onSelect,
  className,
}: LandmarkMarkerProps) {
  const content = (
    <>
      <span className="landmark-marker__dot" aria-hidden="true">
        {number !== undefined ? (
          number.toLocaleString('ar')
        ) : (
          <MapPin size={20} strokeWidth={1.5} />
        )}
      </span>
      <span>{label}</span>
    </>
  );
  const classes = clsx('landmark-marker', { 'landmark-marker--active': active }, className);
  return onSelect ? (
    <button className={classes} type="button" aria-pressed={active} onClick={onSelect}>
      {content}
    </button>
  ) : (
    <span className={classes}>{content}</span>
  );
}
