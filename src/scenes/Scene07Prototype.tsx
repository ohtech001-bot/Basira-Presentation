import { motion, useReducedMotion } from 'framer-motion';
import { Award, Check, CircleHelp, Sparkles, TrendingUp } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { Counter } from '../components/animations/Counter';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const milestones = [
  { label: 'سؤال', icon: CircleHelp },
  { label: 'إجابة', icon: Check },
  { label: 'نقاط', icon: Sparkles },
  { label: 'تقدم', icon: TrendingUp },
  { label: 'إنجاز', icon: Award },
];

export function Scene07Prototype({ title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="التعلم يتحول إلى تحدٍ"
      className="basira-s07"
    >
      <div className="s07-layout">
        <motion.div
          className="s07-main"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
        >
          <div className="product-screen s07-quiz-screen">
            <UiImage asset={uiAssets.quiz} fit="contain" />
          </div>
          <ol className="s07-milestones">
            {milestones.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ol>
        </motion.div>
        <motion.aside
          className="s07-aside"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.12 }}
        >
          <figure>
            <div className="product-screen s07-support-screen">
              <UiImage asset={uiAssets.profile} fit="contain" />
            </div>
            <figcaption>ملفك الشخصي يسجّل اكتشافاتك</figcaption>
          </figure>
          <figure>
            <div className="product-screen s07-support-screen">
              <UiImage asset={uiAssets.progress} fit="contain" />
            </div>
            <figcaption>تابع تقدمك والإنجازات التي حققتها</figcaption>
          </figure>
          <div className="s07-points">
            <Sparkles size={27} strokeWidth={1.5} aria-hidden="true" />
            <Counter value={50} visible locale="en" prefix="+" duration={0.5} />
            <span>
              نقطة للإجابة الصحيحة
              <br />
              <small>كما تظهر في واجهة الاختبار</small>
            </span>
          </div>
          <p className="s07-achievement">
            <Award size={26} aria-hidden="true" />
            إنجاز يفتح الباب إلى التحدي التالي
          </p>
        </motion.aside>
      </div>
    </ProductScene>
  );
}
