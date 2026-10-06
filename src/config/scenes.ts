import type { SceneDefinition } from '../types/presentation';
import { Scene01Opening } from '../scenes/Scene01Opening';
import { Scene02ProblemReveal } from '../scenes/Scene02ProblemReveal';
import { Scene03BasiraIntro } from '../scenes/Scene03BasiraIntro';
import { Scene04HowItWorks } from '../scenes/Scene04HowItWorks';
import { Scene05Features } from '../scenes/Scene05Features';
import { Scene06Audience } from '../scenes/Scene06Audience';
import { Scene07Prototype } from '../scenes/Scene07Prototype';
import { Scene08Impact } from '../scenes/Scene08Impact';
import { Scene09Execution } from '../scenes/Scene09Execution';
import { Scene10Timeline } from '../scenes/Scene10Timeline';
import { Scene11Budget } from '../scenes/Scene11Budget';
import { Scene12Sustainability } from '../scenes/Scene12Sustainability';
import { Scene13Metrics } from '../scenes/Scene13Metrics';
import { Scene14Team } from '../scenes/Scene14Team';
import { Scene15Vision } from '../scenes/Scene15Vision';

export const scenes: SceneDefinition[] = [
  {
    id: 'opening',
    title: 'هل تعرف هذا المعلم؟',
    number: 1,
    totalSteps: 4,
    component: Scene01Opening,
  },
  {
    id: 'problem',
    title: 'المعرفة تبدأ بسؤال',
    number: 2,
    totalSteps: 4,
    component: Scene02ProblemReveal,
  },
  { id: 'basira', title: 'بصيرة', number: 3, totalSteps: 6, component: Scene03BasiraIntro },
  {
    id: 'how-it-works',
    title: 'كيف تعمل المحاكاة؟',
    number: 4,
    totalSteps: 8,
    component: Scene04HowItWorks,
  },
  {
    id: 'landmarks',
    title: 'استعراض المعالم',
    number: 5,
    totalSteps: 4,
    component: Scene05Features,
  },
  {
    id: 'map',
    title: 'الخريطة التفاعلية',
    number: 6,
    totalSteps: 4,
    component: Scene06Audience,
  },
  {
    id: 'quizzes',
    title: 'الاختبارات والتحديات',
    number: 7,
    totalSteps: 6,
    component: Scene07Prototype,
  },
  {
    id: 'competition',
    title: 'المسابقة الجماعية',
    number: 8,
    totalSteps: 5,
    component: Scene08Impact,
  },
  {
    id: 'audience',
    title: 'الفئة المستهدفة',
    number: 9,
    totalSteps: 4,
    component: Scene09Execution,
  },
  {
    id: 'prototype',
    title: 'النموذج الأولي',
    number: 10,
    totalSteps: 7,
    component: Scene10Timeline,
  },
  { id: 'impact', title: 'الأثر المتوقع', number: 11, totalSteps: 4, component: Scene11Budget },
  {
    id: 'execution',
    title: 'خطة التنفيذ',
    number: 12,
    totalSteps: 5,
    component: Scene12Sustainability,
  },
  { id: 'budget', title: 'الميزانية', number: 13, totalSteps: 4, component: Scene13Metrics },
  { id: 'team', title: 'فريق العمل', number: 14, totalSteps: 4, component: Scene14Team },
  { id: 'vision', title: 'الرؤية المستقبلية', number: 15, totalSteps: 7, component: Scene15Vision },
];
