import { Baby, BookOpen, GraduationCap, School, UsersRound, Building2, Globe2 } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { AnimatedNumberText } from '../components/animations/AnimatedNumberText';

const audiences = [
  { label: 'الأطفال من عمر 5 سنوات فما فوق', icon: Baby },
  { label: 'الطلاب', icon: GraduationCap },
  { label: 'الشباب', icon: BookOpen },
  { label: 'العائلات', icon: UsersRound },
  { label: 'المدارس', icon: School },
  { label: 'المؤسسات التعليمية والثقافية', icon: Building2 },
];

export function Scene09Execution({ title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تجربة تجمع الأعمار، وتتجاوز المسافات"
      className="story-audience"
    >
      <div className="audience-layout story-enter">
        <div className="audience-cards">
          {audiences.map(({ label, icon: Icon }) => (
            <CinematicReveal key={label} visible className="audience-card">
              <Icon size={47} strokeWidth={1.3} />
              <h2>
                <AnimatedNumberText text={label} />
              </h2>
            </CinematicReveal>
          ))}
        </div>
        <CinematicReveal visible className="audience-world">
          <div className="audience-orbit" aria-hidden="true" />
          <Globe2 className="audience-globe" size={305} strokeWidth={0.65} aria-hidden="true" />
          <div className="audience-global">
            <span className="story-eyebrow">من أي مكان في العالم</span>
            <h2>الأشخاص حول العالم الذين لا يستطيعون زيارة المسجد الأقصى</h2>
          </div>
        </CinematicReveal>
      </div>
    </ProductScene>
  );
}
