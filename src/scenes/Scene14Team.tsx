import { UsersRound } from 'lucide-react';
import type { SceneProps } from '../types/presentation';
import { ProductScene } from '../components/presentation/ProductScene';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import { team } from '../data/team';

export function Scene14Team({ title, number }: SceneProps) {
  return (
    <ProductScene title={title} number={number} subtitle="فريق بصيرة" className="story-team">
      <div className="team-connection" aria-hidden="true">
        <span />
        <UsersRound size={56} strokeWidth={1} />
        <span />
      </div>
      <div className="team-members story-enter">
        {team.map((member, index) => (
          <CinematicReveal key={member.id} visible className="team-member">
            <span className="team-member-number" dir="ltr">
              0{index + 1}
            </span>
            <div className="team-monogram" aria-hidden="true">
              {member.name
                .split(' ')
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join(' ')}
            </div>
            <div className="team-member-rule" />
            <h2>{member.name}</h2>
          </CinematicReveal>
        ))}
      </div>
    </ProductScene>
  );
}
