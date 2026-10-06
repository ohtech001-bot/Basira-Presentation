import clsx from 'clsx';
import { uiAssets } from '../../data/uiAssets';
import { UiImage } from './UiImage';

interface BasiraMarkProps {
  className?: string;
  showWord?: boolean;
}

export function BasiraMark({ className, showWord = true }: BasiraMarkProps) {
  return (
    <div className={clsx('basira-mark', className)}>
      <div className="basira-mark__symbol">
        <UiImage
          asset={uiAssets.logo}
          alt="شعار بصيرة الأصلي"
          fit="contain"
          fallback={<span className="logo-unavailable">الشعار غير متاح</span>}
        />
      </div>
      {showWord && <span className="basira-mark__word">بصيرة</span>}
    </div>
  );
}
