import { motion, useReducedMotion } from 'framer-motion';
import { Clock3, Flag, MapPin, Target, Users } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { Counter } from '../components/animations/Counter';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const teams = [
  { label: 'الفريق الأخضر', name: 'فريق A', points: 320, progress: 72, className: 'green' },
  { label: 'الفريق الأزرق', name: 'فريق B', points: 280, progress: 64, className: 'blue' },
];
const questions = ['من يصل إلى المعلم أولًا؟', 'من يجيب بشكل صحيح؟', 'من يجمع نقاطًا أكثر؟'];

export function Scene08Impact({ title, number }: SceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تعلّم، اكتشف، وتنافس مع فريقك داخل المحاكاة"
      className="basira-s08"
    >
      <div className="s08-layout">
        <motion.figure
          className="s08-main"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
        >
          <div className="product-screen s08-competition-screen">
            <UiImage asset={uiAssets.competition} fit="contain" />
          </div>
          <figcaption>
            <Users size={22} strokeWidth={1.5} aria-hidden="true" />
            فريقان، رحلة واحدة، وتحديات مشتركة
          </figcaption>
        </motion.figure>
        <motion.aside
          className="s08-aside"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.12 }}
        >
          <div className="s08-scoreboard">
            {teams.map((team) => (
              <div
                key={team.name}
                className={['s08-team', 's08-team--' + team.className].join(' ')}
              >
                <h3>{team.label}</h3>
                <span>{team.name}</span>
                <Counter value={team.points} visible locale="en" duration={0.5} />
                <p>
                  <Users size={18} aria-hidden="true" />٤ أعضاء
                </p>
              </div>
            ))}
          </div>
          <div className="s08-clock">
            <Clock3 size={24} aria-hidden="true" />
            <strong>08:24</strong>
            <span>الوقت المتبقي</span>
          </div>
          <div className="s08-task">
            <small>المهمة الحالية</small>
            <p>اعثر على سبيل قايتباي</p>
          </div>
          <div className="s08-progress">
            {teams.map((team) => (
              <div
                key={team.name}
                className={['s08-progress-row', 's08-progress-row--' + team.className].join(' ')}
              >
                <span>{team.name}</span>
                <div>
                  <i style={{ width: team.progress + '%' }} />
                </div>
                <small>{team.progress}%</small>
              </div>
            ))}
          </div>
          <div className="s08-challenges">
            <span>
              <MapPin size={18} aria-hidden="true" />
              الوصول إلى المعلم
            </span>
            <span>
              <Target size={18} aria-hidden="true" />
              إجابة صحيحة
            </span>
            <span>
              <Flag size={18} aria-hidden="true" />
              إكمال التحدي
            </span>
          </div>
          <ol className="s08-questions">
            {questions.map((question, index) => (
              <li key={question}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                {question}
              </li>
            ))}
          </ol>
          <small className="s08-example">مثال تنافسي داخل المحاكاة</small>
        </motion.aside>
      </div>
    </ProductScene>
  );
}
