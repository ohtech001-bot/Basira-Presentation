import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Building2, Compass, ScanLine } from 'lucide-react';
import { SceneFrame } from '../components/presentation/SceneFrame';
import { AnimatedText } from '../components/animations/AnimatedText';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { ParallaxImage } from '../components/animations/ParallaxImage';
import { LandmarkPlaceholder } from '../components/aqsa/LandmarkPlaceholder';
import type { SceneProps } from '../types/presentation';
import { uiAssets } from '../data/uiAssets';

const fragments = [
  { text: 'معرفة محدودة بالمعالم', icon: Compass, className: 'problem-fragment--knowledge' },
  {
    text: 'تصور غير دقيق عن حدود المسجد الأقصى',
    icon: ScanLine,
    className: 'problem-fragment--accuracy',
  },
  { text: 'معلومات متفرقة وغير تفاعلية', icon: Building2, className: 'problem-fragment--place' },
  {
    text: 'الحاجة إلى أسلوب أكثر جذبًا للجيل الجديد',
    icon: BookOpen,
    className: 'problem-fragment--content',
  },
];

export function Scene02ProblemReveal({ currentStep, title }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <SceneFrame className="problem-scene" label={title}>
      <motion.div
        className="problem-visual"
        initial={false}
        animate={{ opacity: currentStep >= 3 ? 0.32 : 0.8 }}
        transition={{ duration: reducedMotion ? 0 : 0.8 }}
      >
        <ParallaxImage
          src={uiAssets.qaytbay.src}
          alt="الصورة نفسها للمعلم المختار في المشهد الافتتاحي"
          active
          className="opening-image"
          zoomScale={1.025}
          fallback={<LandmarkPlaceholder />}
        />
        <div className="opening-image-shade" />
        <div className="opening-vignette" />
      </motion.div>

      <CinematicReveal visible={currentStep >= 1} className="problem-landmark-label">
        <div className="problem-label-anchor" aria-hidden="true">
          <i />
          <span />
        </div>
        <span>سبيل قايتباي</span>
      </CinematicReveal>

      <motion.div
        className="problem-copy"
        initial={false}
        animate={{ y: currentStep >= 3 ? -70 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatedText visible={currentStep >= 2} className="problem-question">
          <span className="scene-eyebrow">
            <i aria-hidden="true" />
            فجوة في المعرفة
          </span>
          <h1>
            إذا كان هذا المعلم غير معروف لك...
            <br />
            فكم معلمًا آخر في المسجد الأقصى لا نعرفه؟
          </h1>
        </AnimatedText>
      </motion.div>

      <div className="problem-constellation" aria-hidden={currentStep < 3}>
        <motion.svg
          className="problem-connections"
          viewBox="0 0 1700 340"
          fill="none"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.2 }}
        >
          <path
            d="M1580 194L1195 88L805 222L403 108L106 254"
            stroke="url(#problem-connection-gold)"
            strokeWidth="1"
            strokeDasharray="3 8"
          />
          <defs>
            <linearGradient id="problem-connection-gold" x1="106" x2="1580">
              <stop stopColor="#c6a369" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#c6a369" stopOpacity="0.45" />
              <stop offset="1" stopColor="#c6a369" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </motion.svg>
        {fragments.map(({ text, icon: Icon, className }, index) => (
          <CinematicReveal
            visible={currentStep >= 3}
            key={text}
            className={`problem-fragment ${className}`}
            delay={index * 0.14}
          >
            <div className="problem-fragment-symbol" aria-hidden="true">
              <Icon strokeWidth={1.1} />
            </div>
            <p>{text}</p>
          </CinematicReveal>
        ))}
      </div>
    </SceneFrame>
  );
}
