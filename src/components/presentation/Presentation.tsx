import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePresentation } from '../../hooks/usePresentation';
import { useFullscreen } from '../../hooks/useFullscreen';
import { usePreloadAssets } from '../../hooks/usePreloadAssets';
import { useNearbyAssetPreload } from '../../hooks/useNearbyAssetPreload';
import { presentationConfig } from '../../config/presentation';
import { scenes } from '../../config/scenes';
import { Scene } from './Scene';
import { KeyboardControls } from './KeyboardControls';
import { ProgressIndicator } from './ProgressIndicator';
import { PresenterControls } from './PresenterControls';
import { BasiraMark } from '../ui/BasiraMark';

const assets = Object.values(presentationConfig.assets);
const getScale = () =>
  Math.min(
    document.documentElement.clientWidth / presentationConfig.width,
    document.documentElement.clientHeight / presentationConfig.height,
  );

export function Presentation() {
  const presentation = usePresentation();
  const fullscreen = useFullscreen();
  const { ready } = usePreloadAssets(assets);
  const [scale, setScale] = useState(getScale);
  const viewportRef = useRef<HTMLElement>(null);
  useNearbyAssetPreload(presentation.scene.number, ready);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(
        Math.min(
          entry.contentRect.width / presentationConfig.width,
          entry.contentRect.height / presentationConfig.height,
        ),
      );
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={viewportRef} className="presentation-viewport" aria-label="عرض بصيرة التفاعلي">
      <KeyboardControls
        enabled={ready}
        handlers={{
          next: presentation.next,
          previous: presentation.previous,
          first: presentation.first,
          last: presentation.last,
          restart: presentation.restart,
          toggleFullscreen: fullscreen.toggle,
          exitFullscreen: fullscreen.exit,
        }}
      />
      <div className="stage-holder" style={{ width: 1920 * scale, height: 1080 * scale }}>
        <div
          className="presentation-stage"
          style={{ '--stage-scale': scale } as CSSProperties}
          data-scene={presentation.scene.number}
          data-step={presentation.step}
          data-ready={ready}
          data-scene-id={presentation.scene.id}
        >
          <AnimatePresence mode="sync" initial={false}>
            {!ready ? (
              <motion.div
                key="loading"
                className="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BasiraMark className="loading-brand" showWord={false} />
                <span className="loading-line" />
                <p role="status">جارٍ تجهيز التجربة...</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${presentation.scene.id}-${presentation.revision}`}
                className="scene-layer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeInOut' }}
              >
                <Scene
                  definition={presentation.scene}
                  currentStep={presentation.step}
                  onStepChange={presentation.onStepChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {ready && (
            <ProgressIndicator current={presentation.sceneIndex + 1} total={scenes.length} />
          )}
        </div>
      </div>
      {ready && (
        <PresenterControls
          sceneNumber={presentation.scene.number}
          sceneCount={scenes.length}
          previous={presentation.previous}
          next={presentation.next}
          restart={presentation.restart}
          toggleFullscreen={fullscreen.toggle}
          isFullscreen={fullscreen.isFullscreen}
          isFirst={presentation.isFirst}
          isLast={presentation.isLast}
        />
      )}
      <p className="sr-only" role="status" aria-live="polite">
        الشريحة {presentation.scene.number} من {scenes.length}: {presentation.scene.title}
      </p>
      {fullscreen.error && (
        <div className="fullscreen-notice" role="status">
          {fullscreen.error}
        </div>
      )}
    </main>
  );
}
