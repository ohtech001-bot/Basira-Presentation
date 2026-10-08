import { BookOpen, Building2, Compass, ScanLine } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const problems = [
  { text: 'معرفة محدودة بالمعالم', icon: Compass },
  { text: 'تصور غير دقيق عن حدود المسجد الأقصى', icon: ScanLine },
  { text: 'معلومات متفرقة وغير تفاعلية', icon: Building2 },
  { text: 'الحاجة إلى أسلوب أكثر جذبًا للجيل الجديد', icon: BookOpen },
];

export function Scene02ProblemReveal({ title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="المشكلة: مكان نعرف اسمه… ومعالم تستحق أن نعرف قصتها"
      className="deck-problem"
    >
      <div className="deck-problem-layout">
        <CinematicReveal visible className="deck-problem-photo">
          <UiImage asset={uiAssets.qaytbay} fit="contain" />
          <figcaption>
            <span>الإجابة</span>
            <h2>سبيل قايتباي</h2>
          </figcaption>
        </CinematicReveal>
        <div className="deck-problem-content">
          <CinematicReveal visible className="deck-problem-question">
            <h2>
              إذا كان هذا المعلم غير معروف لك...
              <br />
              <em>فكم معلمًا آخر في المسجد الأقصى لا نعرفه؟</em>
            </h2>
          </CinematicReveal>
          <div className="deck-problem-cards">
            {problems.map(({ text, icon: Icon }, index) => (
              <CinematicReveal
                visible
                delay={index * 0.07}
                className="deck-problem-card"
                key={text}
              >
                <Icon size={38} strokeWidth={1.2} aria-hidden="true" />
                <p>{text}</p>
              </CinematicReveal>
            ))}
          </div>
        </div>
      </div>
    </ProductScene>
  );
}
