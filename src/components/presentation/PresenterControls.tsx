import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { presentationConfig } from '../../config/presentation';
import { FullscreenButton } from './FullscreenButton';

interface Props {
  sceneNumber: number;
  sceneCount: number;
  previous: () => void;
  next: () => void;
  restart: () => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function PresenterControls(props: Props) {
  const [visible, setVisible] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const scheduleHide = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (!panelRef.current?.contains(document.activeElement)) setVisible(false);
    }, presentationConfig.controlHideDelay);
  }, []);
  useEffect(() => {
    const show = () => {
      setVisible(true);
      scheduleHide();
    };
    const move = (event: PointerEvent) => {
      if (event.clientY >= window.innerHeight - 130) show();
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Tab') show();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', move);
    window.addEventListener('keydown', key);
    scheduleHide();
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      window.removeEventListener('keydown', key);
    };
  }, [scheduleHide]);
  return (
    <div
      ref={panelRef}
      className={`presenter-controls ${visible ? 'is-visible' : ''}`}
      aria-label="أدوات مقدّم العرض"
      onFocus={() => {
        setVisible(true);
        scheduleHide();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) scheduleHide();
      }}
    >
      <button type="button" disabled={props.isFirst} onClick={props.previous} title="السابق (←)">
        <ArrowLeft size={19} />
        <span>السابق</span>
      </button>
      <span
        className="control-position"
        aria-label={`الشريحة ${props.sceneNumber} من ${props.sceneCount}`}
      >
        <b>{String(props.sceneNumber).padStart(2, '0')}</b>
        <span> / {props.sceneCount}</span>
      </span>
      <button type="button" disabled={props.isLast} onClick={props.next} title="التالي (→ / Space)">
        <span>التالي</span>
        <ArrowRight size={19} />
      </button>
      <span className="control-divider" />
      <button
        type="button"
        className="control-icon"
        onClick={props.restart}
        aria-label="إعادة الشريحة"
        title="إعادة الشريحة (R)"
      >
        <RotateCcw size={20} />
      </button>
      <FullscreenButton active={props.isFullscreen} onClick={props.toggleFullscreen} />
    </div>
  );
}
