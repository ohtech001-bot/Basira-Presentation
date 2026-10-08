import { Compass, Footprints, Lightbulb, Target } from 'lucide-react';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { GoldLineReveal } from '../components/animations/GoldLineReveal';
import { UiImage } from '../components/ui/UiImage';
import { BasiraMark } from '../components/ui/BasiraMark';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

const verbs = [
  { text: 'تجوّل', icon: Footprints },
  { text: 'اكتشف', icon: Compass },
  { text: 'تعلّم', icon: Lightbulb },
  { text: 'تحدَّ', icon: Target },
];

export function Scene03BasiraIntro({ title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="منظومة تفاعلية للتعريف بالمسجد الأقصى المبارك"
      className="deck-solution"
    >
      <div className="deck-solution-layout">
        <CinematicReveal visible className="deck-solution-product">
          <div className="product-screen deck-solution-screen">
            <UiImage asset={uiAssets.exploration} fit="contain" />
          </div>
          <div className="deck-solution-verbs">
            {verbs.map(({ text, icon: Icon }) => (
              <span key={text}>
                <Icon size={29} strokeWidth={1.4} aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </CinematicReveal>
        <CinematicReveal visible delay={0.1} className="deck-solution-message">
          <BasiraMark showWord={false} className="deck-solution-logo" />
          <GoldLineReveal visible className="deck-solution-line" />
          <span className="deck-eyebrow">
            <i /> الحل
          </span>
          <h2>
            من المعرفة
            <br />
            إلى <em>التجربة.</em>
          </h2>
          <p>
            نحن لا نريد أن يقرأ المستخدم عن المسجد الأقصى فقط...
            <br />
            <strong>نريده أن يدخله ويكتشفه.</strong>
          </p>
        </CinematicReveal>
      </div>
    </ProductScene>
  );
}
