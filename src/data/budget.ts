/** Official project amounts only. Detailed allocations await approval. */
export interface ProjectBudget {
  currency: 'ILS';
  currencySymbol: '₪';
  foundingTotal: number;
  monthlyOperatingCap: number;
  teamWork: 'voluntary';
  includesTeamWages: false;
}

export const budget: ProjectBudget = {
  currency: 'ILS',
  currencySymbol: '₪',
  foundingTotal: 6000,
  monthlyOperatingCap: 300,
  teamWork: 'voluntary',
  includesTeamWages: false,
};
