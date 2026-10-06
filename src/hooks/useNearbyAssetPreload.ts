import { useEffect } from 'react';
import { sceneAssetKeys, uiAssets } from '../data/uiAssets';

const loadedAssets = new Set<string>();

/** Two concurrent local image loads, limited to the current and next scenes. */
export function useNearbyAssetPreload(sceneNumber: number, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const keys = [
      ...new Set([
        ...(sceneAssetKeys[sceneNumber] ?? []),
        ...(sceneAssetKeys[sceneNumber + 1] ?? []),
      ]),
    ];
    const queue = keys.map((key) => uiAssets[key].src).filter((src) => !loadedAssets.has(src));
    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        let finished = false;
        const finish = (success = false) => {
          if (finished) return;
          finished = true;
          window.clearTimeout(timeout);
          image.onload = null;
          image.onerror = null;
          if (success) loadedAssets.add(src);
          resolve();
        };
        const timeout = window.setTimeout(() => finish(), 5000);
        image.onload = () => finish(true);
        image.onerror = () => finish();
        cleanups.push(() => finish());
        image.src = src;
      });
    const worker = async () => {
      while (!cancelled && queue.length) {
        const src = queue.shift();
        if (src) await preload(src);
      }
    };
    const timer = window.setTimeout(() => {
      void worker();
      void worker();
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [sceneNumber, enabled]);
}
