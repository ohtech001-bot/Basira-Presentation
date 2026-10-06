import { useCallback, useEffect, useState } from 'react';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [error, setError] = useState('');
  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        setError('تعذّر الخروج من ملء الشاشة. استخدم Escape.');
      }
    }
  }, []);
  const toggle = useCallback(async () => {
    setError('');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else setError('ملء الشاشة غير متاح في هذا المتصفح.');
    } catch {
      setError('لم يسمح المتصفح بملء الشاشة. حاول باستخدام الزر.');
    }
  }, []);
  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(''), 4200);
    return () => window.clearTimeout(timer);
  }, [error]);
  return { isFullscreen, toggle, exit, error };
}
