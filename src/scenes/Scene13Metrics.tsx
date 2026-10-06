import { Server, ShieldCheck, Globe2, Cloud, HeartHandshake } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { Counter } from '../components/animations/Counter';
import { budget } from '../data/budget';

const operatingItems = [
  { label: 'الاستضافة', icon: Cloud },
  { label: 'السيرفرات', icon: Server },
  { label: 'الحماية', icon: ShieldCheck },
  { label: 'الرابط', icon: Globe2 },
];

export function Scene13Metrics({ currentStep, title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="استثمار تأسيسي واضح، وتشغيل شهري محدود"
      className="story-budget"
    >
      <div className="budget-layout">
        <CinematicReveal visible={currentStep >= 1} className="budget-founding">
          <span className="story-eyebrow">الميزانية الأساسية</span>
          <div className="budget-amount" dir="ltr">
            <Counter value={budget.foundingTotal} visible={currentStep >= 1} locale="en-US" />
            <span>{budget.currencySymbol}</span>
          </div>
          <div className="budget-gold-rule" />
          <div className="budget-voluntary">
            <HeartHandshake size={40} strokeWidth={1.2} />
            <p>بدون أجور أعضاء الفريق — العمل تطوعي</p>
          </div>
        </CinematicReveal>
        <div className="budget-operating">
          <CinematicReveal visible={currentStep >= 2} className="budget-monthly">
            <span className="story-eyebrow">التشغيل الشهري</span>
            <div className="budget-monthly-amount">
              <span>حتى</span>
              <span dir="ltr">
                <Counter
                  value={budget.monthlyOperatingCap}
                  visible={currentStep >= 2}
                  locale="en-US"
                />{' '}
                {budget.currencySymbol}
              </span>
            </div>
          </CinematicReveal>
          <CinematicReveal visible={currentStep >= 3} className="budget-services">
            {operatingItems.map(({ label, icon: Icon }, index) => (
              <div key={label}>
                <Icon size={35} strokeWidth={1.2} />
                <span>{label}</span>
                <b>{String(index + 1).padStart(2, '0')}</b>
              </div>
            ))}
          </CinematicReveal>
        </div>
      </div>
    </ProductScene>
  );
}
