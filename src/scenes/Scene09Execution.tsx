import { Baby, BookOpen, GraduationCap, School, UsersRound, Building2, Globe2 } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';

const audiences = [
  { label: 'الأطفال من عمر 5 سنوات فما فوق', icon: Baby, step: 1 },
  { label: 'الطلاب', icon: GraduationCap, step: 1 },
  { label: 'الشباب', icon: BookOpen, step: 2 },
  { label: 'العائلات', icon: UsersRound, step: 2 },
  { label: 'المدارس', icon: School, step: 2 },
  { label: 'المؤسسات التعليمية والثقافية', icon: Building2, step: 3 },
];

export function Scene09Execution({ currentStep, title, number }: SceneProps) {
  return (
    <ProductScene
      title={title}
      number={number}
      subtitle="تجربة تجمع الأعمار، وتتجاوز المسافات"
      className="story-audience"
    >
      <div className="audience-layout">
        <div className="audience-cards">
          {audiences.map(({ label, icon: Icon, step }, index) => (
            <CinematicReveal
              key={label}
              visible={currentStep >= step}
              delay={(index % 2) * 0.1}
              className="audience-card"
            >
              <Icon size={42} strokeWidth={1.3} />
              <h2>{label}</h2>
            </CinematicReveal>
          ))}
        </div>
        <div className="audience-world">
          <div className="audience-orbit audience-orbit--one" aria-hidden="true" />
          <div className="audience-orbit audience-orbit--two" aria-hidden="true" />
          <Globe2 className="audience-globe" size={285} strokeWidth={0.55} aria-hidden="true" />
          <CinematicReveal visible={currentStep >= 3} className="audience-global">
            <span className="story-eyebrow">من أي مكان في العالم</span>
            <h2>الأشخاص حول العالم الذين لا يستطيعون زيارة المسجد الأقصى</h2>
          </CinematicReveal>
        </div>
      </div>
    </ProductScene>
  );
}
