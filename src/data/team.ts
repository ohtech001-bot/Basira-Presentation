export interface TeamMember {
  id: string;
  name: string;
}

/** Names only: no unconfirmed roles, biographies, or responsibilities. */
export const team: TeamMember[] = [
  { id: 'mohammad-wajih-omari', name: 'محمد وجيه عمري' },
  { id: 'faisal-adnan-omari', name: 'فيصل عدنان عمري' },
  { id: 'majd-masalha', name: 'مجد مصالحة' },
];
