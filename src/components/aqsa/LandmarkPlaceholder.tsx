import clsx from 'clsx';

interface LandmarkPlaceholderProps {
  className?: string;
}

/** Fallback for the opening asset; the answer remains hidden in Scene 1. */
export function LandmarkPlaceholder({ className }: LandmarkPlaceholderProps) {
  return (
    <div
      className={clsx('landmark-placeholder', 'qaytbay-sabil-placeholder', className)}
      data-placeholder="qaytbay-sabil"
      role="img"
      aria-label="الصورة الافتتاحية غير متوفرة"
    >
      <span>مساحة صورة المعلم الافتتاحي</span>
    </div>
  );
}
