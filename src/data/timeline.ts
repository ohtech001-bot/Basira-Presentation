export interface ProjectPhase {
  id: string;
  number: number;
  label: string;
  duration: string;
}

/** User-approved activities with the project's existing official durations. */
export const timeline: ProjectPhase[] = [
  { id: 'phase-1', number: 1, label: 'جمع المعلومات الموثوقة', duration: '3 أسابيع إلى شهر' },
  { id: 'phase-2', number: 2, label: 'بناء النماذج ثلاثية الأبعاد', duration: '40–50 يومًا' },
  { id: 'phase-3', number: 3, label: 'بناء المحاكاة والتحديات', duration: 'شهر إلى 40 يومًا' },
  { id: 'phase-4', number: 4, label: 'الاختبار والنشر والتطوير المستمر', duration: 'مستمرة' },
];
