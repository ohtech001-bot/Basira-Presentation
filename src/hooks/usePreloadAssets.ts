import { useEffect, useState } from 'react';

export function usePreloadAssets(paths: readonly string[]) {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const tasks = paths.map(
      (path) =>
        new Promise<string | null>((resolve) => {
          const image = new Image();
          let completed = false;
          const finish = (loaded: boolean) => {
            if (completed) return;
            completed = true;
            clearTimeout(timer);
            image.onload = null;
            image.onerror = null;
            resolve(loaded ? null : path);
          };
          const timer = window.setTimeout(() => finish(false), 4000);
          image.onload = () => finish(true);
          image.onerror = () => finish(false);
          image.src = path;
          cleanups.push(() => finish(false));
        }),
    );
    Promise.all(tasks).then((results) => {
      if (!cancelled) {
        setMissing(results.filter((path): path is string => path !== null));
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [paths]);
  return { ready, missing };
}
