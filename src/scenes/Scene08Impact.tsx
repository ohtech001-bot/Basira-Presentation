import { motion, useReducedMotion } from 'framer-motion';
import { Clock3, Flag, MapPin, Target, Users } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { Counter } from '../components/animations/Counter';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const teams = [
  { label: 'الفريق الأزرق', name: 'فريق A', points: 320, progress: 72, className: 'blue' },
  { label: 'الفريق الأحمر', name: 'فريق B', points: 280, progress: 64, className: 'red' },
];
const questions = ['من يصل إلى المعلم أولًا؟', 'من يجيب بشكل صحيح؟', 'من يجمع نقاطًا أكثر؟'];

export function Scene08Impact({ currentStep, title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.6;
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تعلّم، اكتشف، وتنافس مع فريقك داخل المحاكاة"
      className="team-competition-scene"
    >
      <div className="team-competition-layout">
        <div className="team-competition-visual">
          <motion.div
            className="product-screen team-competition-screen"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: reducedMotion ? 0 : 0.85 }}
          >
            <UiImage asset={uiAssets.competition} fit="contain" />
          </motion.div>
          <div className="product-caption team-competition-caption">
            <Users size={23} strokeWidth={1.5} aria-hidden="true" />
            فريقان، رحلة واحدة، وتحديات مشتركة
          </div>
          <motion.div
            className="team-challenge-tags"
            initial={false}
            animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 20 }}
            transition={{ duration }}
            aria-hidden={currentStep < 3}
          >
            <span>
              <MapPin size={22} aria-hidden="true" />
              الوصول إلى المعلم
            </span>
            <span>
              <Target size={22} aria-hidden="true" />
              إجابة صحيحة
            </span>
            <span>
              <Flag size={22} aria-hidden="true" />
              إكمال التحدي
            </span>
          </motion.div>
        </div>
        <aside className="team-competition-aside">
          <motion.div
            className="team-scoreboard"
            initial={false}
            animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 20 }}
            transition={{ duration }}
            aria-hidden={currentStep < 1}
          >
            {teams.map((team) => (
              <div key={team.name} className={`team-score-card team-score-card--${team.className}`}>
                <h3>{team.label}</h3>
                <span className="team-short-name">{team.name}</span>
                <Counter
                  value={team.points}
                  visible={currentStep >= 1}
                  locale="en"
                  duration={1.25}
                />
                <div className="competition-members">
                  <Users size={19} aria-hidden="true" />
                  <span>٤ أعضاء</span>
                  <div aria-hidden="true">
                    {[1, 2, 3, 4].map((member) => (
                      <i key={member} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <span className="team-versus" aria-label="ضد">
              VS
            </span>
          </motion.div>
          <motion.div
            className="team-live-task"
            initial={false}
            animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 2 ? 0 : 15 }}
            transition={{ duration }}
            aria-hidden={currentStep < 2}
          >
            <div className="team-clock">
              <Clock3 size={23} aria-hidden="true" />
              <span>08:24</span>
              <small>الوقت المتبقي</small>
            </div>
            <div className="team-task">
              <small>المهمة الحالية</small>
              <p>اكتشف المسجد القبلي</p>
              <span>مثال تنافسي داخل المحاكاة</span>
            </div>
          </motion.div>
          <motion.div
            className="team-progress-panel"
            initial={false}
            animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
            transition={{ duration }}
            aria-hidden={currentStep < 3}
          >
            {teams.map((team) => (
              <div
                key={team.name}
                className={`team-progress-row team-progress-row--${team.className}`}
              >
                <span>{team.name}</span>
                <div>
                  <motion.i
                    initial={false}
                    animate={{ width: currentStep >= 3 ? `${team.progress}%` : '0%' }}
                    transition={{ duration: reducedMotion ? 0 : 1.1 }}
                  />
                </div>
                <small>{team.progress}%</small>
              </div>
            ))}
          </motion.div>
          <div className="team-questions">
            {questions.map((question, index) => (
              <motion.p
                key={question}
                initial={false}
                animate={{ opacity: currentStep >= 4 ? 1 : 0, x: currentStep >= 4 ? 0 : -20 }}
                transition={{ duration, delay: reducedMotion ? 0 : index * 0.12 }}
                aria-hidden={currentStep < 4}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {question}
              </motion.p>
            ))}
          </div>
        </aside>
      </div>
    </ProductScene>
  );
}
