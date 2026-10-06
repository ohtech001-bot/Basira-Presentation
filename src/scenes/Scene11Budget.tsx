import { BookOpen, Heart, Compass, Globe2, School, UsersRound, ArrowLeft } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { PageFlip } from '../components/animations/PageFlip';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';

const impacts = [
  { icon: BookOpen, text: 'زيادة المعرفة الصحيحة بمعالم المسجد الأقصى', step: 1 },
  { icon: Heart, text: 'تحبيب الجيل الصغير بالمكان', step: 1 },
  { icon: Compass, text: 'تحويل التعلم من قراءة إلى تجربة', step: 2 },
  { icon: Globe2, text: 'إتاحة التعرف على المسجد لمن لا يستطيع زيارته', step: 2 },
  { icon: School, text: 'الاستخدام داخل المدارس', step: 3 },
  { icon: UsersRound, text: 'تعزيز روح التعلم الجماعي والتنافس', step: 3 },
];

export function Scene11Budget({ currentStep, title, number }: SceneProps) {
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
      <div className="impact-layout">
        <div className="impact-cards">
          {impacts.map(({ icon: Icon, text, step }, index) => (
            <CinematicReveal
              key={text}
              visible={currentStep >= step}
              className="impact-card"
              delay={(index % 2) * 0.1}
            >
              <Icon size={34} strokeWidth={1.3} />
              <h2>{text}</h2>
            </CinematicReveal>
          ))}
        </div>
        <div className="impact-transition">
          <CinematicReveal visible={currentStep >= 1} className="impact-flip-wrap">
            <PageFlip
              flipped={currentStep >= 2}
              front={
                <div className="impact-traditional">
                  <BookOpen size={55} strokeWidth={1} />
                  <span>المحتوى التقليدي</span>
                  <h2>المسجد الأقصى المبارك</h2>
                  <p>معالم، وحكايات، ومعرفة تنتظر من يكتشفها.</p>
                  <div className="impact-text-lines" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              }
              back={<UiImage asset={uiAssets.exploration} fit="contain" />}
            />
          </CinematicReveal>
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
