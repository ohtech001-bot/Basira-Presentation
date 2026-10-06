import { motion, useReducedMotion } from 'framer-motion';
import { SceneFrame } from '../components/presentation/SceneFrame';
import type { SceneProps } from '../types/presentation';
import '../styles/scaffolds.css';

/** An intentionally unfinished scene: the layout is ready for approved content. */
export function SceneScaffold({ title, number, currentStep }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' as const },
  };

  return (
    <SceneFrame className="scaffold-scene" label={title}>
      <div className="scaffold-orbit" aria-hidden="true" />
      <header className="scaffold-heading">
        <div className="scaffold-eyebrow">
          <span className="scaffold-wordmark">بصيرة</span>
          <span className="scaffold-heading-rule" aria-hidden="true" />
          <span>مساحة المشهد</span>
          <span className="scaffold-number">{String(number).padStart(2, '0')}</span>
        </div>
        <motion.h1 {...reveal}>{title}</motion.h1>
        <motion.div {...reveal} className="scaffold-subtitle">
          الهيكل جاهز لإضافة المحتوى بعد اعتماد التصميم
        </motion.div>
      </header>

      <div className="scaffold-layout">
        <div className="scaffold-primary-outline">
          {currentStep >= 1 && (
            <motion.div {...reveal} className="scaffold-primary-content">
              <div className="scaffold-arch" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="scaffold-slot-label">المحتوى الرئيسي</span>
              <p>مساحة مخصصة للنص أو الصورة أو التجربة</p>
              <div className="scaffold-skeleton" aria-hidden="true">
                <span />
                <span />
              </div>
            </motion.div>
          )}
          <span className="scaffold-corner scaffold-corner-start" aria-hidden="true" />
          <span className="scaffold-corner scaffold-corner-end" aria-hidden="true" />
        </div>
        <div className="scaffold-supporting">
          {currentStep >= 2 && (
            <motion.div {...reveal} className="scaffold-supporting-content">
              <div className="scaffold-slot-label">مواد داعمة</div>
              {[0, 1, 2].map((slot) => (
                <div className="scaffold-support-slot" key={slot}>
                  <span className="scaffold-slot-symbol" aria-hidden="true" />
                  <div className="scaffold-support-lines" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                </div>
              ))}
              <p>تُضاف المواد المعتمدة هنا</p>
            </motion.div>
          )}
        </div>
      </div>

      <footer className="scaffold-footer">
        <span className="scaffold-status-dot" aria-hidden="true" />
        <span>مشهد قيد الإعداد</span>
      </footer>
    </SceneFrame>
  );
}
