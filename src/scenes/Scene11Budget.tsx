import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BookOpen, Heart, Compass, Globe2, School, UsersRound, ArrowLeft } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { PageFlip } from '../components/animations/PageFlip';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';

const impacts = [
  { icon: BookOpen, text: 'زيادة المعرفة الصحيحة بمعالم المسجد الأقصى' },
  { icon: Heart, text: 'تحبيب الجيل الصغير بالمكان' },
  { icon: Compass, text: 'تحويل التعلم من قراءة إلى تجربة' },
  { icon: Globe2, text: 'إتاحة التعرف على المسجد لمن لا يستطيع زيارته' },
  { icon: School, text: 'الاستخدام داخل المدارس' },
  { icon: UsersRound, text: 'تعزيز روح التعلم الجماعي والتنافس' },
];

export function Scene11Budget({ title, number }: SceneProps) {
  const reduceMotion = useReducedMotion();
  const [turned, setTurned] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setTurned(true), reduceMotion ? 0 : 150);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="المعرفة تصبح تجربة… والأثر يمتد إلى الجميع"
      className="story-impact"
    >
      <div className="impact-background" aria-hidden="true">
        <UiImage asset={uiAssets.exploration} fit="cover" alt="" />
      </div>
      <div className="impact-layout story-enter">
        <div className="impact-cards">
          {impacts.map(({ icon: Icon, text }) => (
            <CinematicReveal key={text} visible className="impact-card">
              <Icon size={36} strokeWidth={1.3} />
              <h2>{text}</h2>
            </CinematicReveal>
          ))}
        </div>
        <div className="impact-transition">
          <span className="story-eyebrow">من المعرفة إلى الاكتشاف</span>
          <div className="impact-flip-wrap">
            <PageFlip
              flipped={turned || Boolean(reduceMotion)}
              duration={0.55}
              front={
                <div className="impact-traditional">
                  <BookOpen size={52} strokeWidth={1} />
                  <span>المحتوى التقليدي</span>
                  <h2>المسجد الأقصى المبارك</h2>
                  <p>معالم، وحكايات، ومعرفة تنتظر من يكتشفها.</p>
                  <div className="impact-text-lines" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              }
              back={<UiImage asset={uiAssets.exploration} fit="contain" />}
            />
          </div>
          <div className="impact-flip-caption">
            <span>قراءة</span>
            <ArrowLeft size={29} />
            <strong>تجربة تفاعلية</strong>
          </div>
        </div>
      </div>
    </ProductScene>
  );
}
