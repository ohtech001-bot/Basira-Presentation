import { Server, ShieldCheck, Globe2, Cloud, HeartHandshake } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { budget } from '../data/budget';

const operatingItems = [
  { label: 'الاستضافة', icon: Cloud },
  { label: 'السيرفرات', icon: Server },
  { label: 'الحماية', icon: ShieldCheck },
  { label: 'الرابط', icon: Globe2 },
];

export function Scene13Metrics({ title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="استثمار تأسيسي واضح، وتشغيل شهري محدود"
      className="story-budget"
    >
      <div className="budget-layout story-enter">
        <CinematicReveal visible className="budget-founding">
          <span className="story-eyebrow">الميزانية الأساسية</span>
          <div className="budget-amount" dir="ltr">
            <span>{budget.foundingTotal.toLocaleString('en-US')}</span>
            <span>{budget.currencySymbol}</span>
          </div>
          <div className="budget-gold-rule" />
          <div className="budget-voluntary">
            <HeartHandshake size={44} strokeWidth={1.2} />
            <p>بدون أجور أعضاء الفريق — العمل تطوعي</p>
          </div>
        </CinematicReveal>
        <div className="budget-operating">
          <CinematicReveal visible className="budget-monthly">
            <span className="story-eyebrow">التشغيل الشهري</span>
            <div className="budget-monthly-amount">
              <span>حتى</span>
              <span dir="ltr">
                {budget.monthlyOperatingCap} {budget.currencySymbol}
              </span>
            </div>
          </CinematicReveal>
          <CinematicReveal visible className="budget-services">
            {operatingItems.map(({ label, icon: Icon }) => (
              <div key={label}>
                <Icon size={41} strokeWidth={1.2} />
                <span>{label}</span>
              </div>
            ))}
          </CinematicReveal>
        </div>
      </div>
    </ProductScene>
  );
}
