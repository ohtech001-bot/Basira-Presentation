import { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { MapPin } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export interface LandmarkCardProps {
  name: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
}

export function LandmarkCard({ name, description, image, children, className }: LandmarkCardProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const showImage = Boolean(image && image !== failedImage);
  return (
    <GlassCard className={clsx('landmark-card', className)}>
      <div className="landmark-card__image">
        {(!showImage || loadedImage !== image) && (
          <div className="landmark-card__placeholder" aria-label="مساحة لصورة المعلم">
            <MapPin size={40} strokeWidth={1} aria-hidden="true" />
            <span>صورة المعلم</span>
          </div>
        )}
        {showImage && (
          <img
            src={image}
            alt={name}
            draggable={false}
            style={{ opacity: loadedImage === image ? 1 : 0 }}
            onLoad={() => setLoadedImage(image || null)}
            onError={() => setFailedImage(image || null)}
          />
        )}
      </div>
      <div className="landmark-card__content">
        <h3>{name}</h3>
        {description && <p>{description}</p>}
        {children}
      </div>
    </GlassCard>
  );
}
