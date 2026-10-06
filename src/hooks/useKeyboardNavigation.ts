import { useEffect } from 'react';

export interface NavigationHandlers {
  next: () => void;
  previous: () => void;
  first: () => void;
  last: () => void;
  restart: () => void;
  toggleFullscreen: () => void;
  exitFullscreen: () => void;
}

export function useKeyboardNavigation(handlers: NavigationHandlers, enabled = true) {
  const { next, previous, first, last, restart, toggleFullscreen, exitFullscreen } = handlers;
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      if (
        event.key === ' ' &&
        target instanceof HTMLElement &&
        target.closest('button, a, [role="button"]')
      )
        return;
      const key = event.key.toLowerCase();
      const action = {
        arrowright: next,
        ' ': next,
        arrowleft: previous,
        home: first,
        end: last,
        r: restart,
        f: toggleFullscreen,
        escape: exitFullscreen,
      }[key];
      if (action) {
        event.preventDefault();
        action();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, next, previous, first, last, restart, toggleFullscreen, exitFullscreen]);
}
