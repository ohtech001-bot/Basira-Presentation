export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="scene-progress"
      role="progressbar"
      aria-label="تقدم المشاهد"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div className="scene-progress-fill" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  );
}
