import { useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import type { UiAsset } from '../../data/uiAssets';

interface UiImageProps {
  asset: UiAsset;
  className?: string;
  fit?: 'contain' | 'cover';
  alt?: string;
  loading?: 'eager' | 'lazy';
  fallback?: ReactNode;
  style?: CSSProperties;
}

export function UiImage({
  asset,
  className,
  fit = 'contain',
  alt = asset.title,
  loading = 'eager',
  fallback,
  style,
}: UiImageProps) {
  const [loadedSrc, setLoadedSrc] = useState('');
  const [failedSrc, setFailedSrc] = useState('');
  const loaded = loadedSrc === asset.src;
  const failed = failedSrc === asset.src;
  return (
    <div
      className={clsx('ui-image', className, {
        'ui-image--loaded': loaded,
        'ui-image--failed': failed,
      })}
      style={{ '--image-ratio': `${asset.width} / ${asset.height}`, ...style } as CSSProperties}
      data-asset={asset.id}
      aria-busy={!loaded && !failed}
    >
      {!failed && (
        <img
          key={asset.src}
          src={asset.src}
          alt={alt}
          width={asset.width}
          height={asset.height}
          loading={loading}
          decoding="async"
          draggable={false}
          style={{ objectFit: fit, opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoadedSrc(asset.src)}
          onError={() => setFailedSrc(asset.src)}
        />
      )}
      {!loaded && (
        <div className="ui-image__status" role="status">
          {failed ? (
            (fallback ?? <span>تعذّر عرض الصورة</span>)
          ) : (
            <span className="ui-image__loading-dot" aria-label="جارٍ تحميل الصورة" />
          )}
        </div>
      )}
    </div>
  );
}
