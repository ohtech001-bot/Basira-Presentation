import { Maximize, Minimize } from 'lucide-react';

export function FullscreenButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="control-icon"
      aria-label={active ? 'الخروج من ملء الشاشة' : 'ملء الشاشة'}
      title="ملء الشاشة (F)"
      onClick={onClick}
    >
      {active ? <Minimize size={20} /> : <Maximize size={20} />}
    </button>
  );
}
