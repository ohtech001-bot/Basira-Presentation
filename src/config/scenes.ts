import type { SceneDefinition } from '../types/presentation';
import { SceneBrandOpening } from '../scenes/SceneBrandOpening';
import { Scene01Opening } from '../scenes/Scene01Opening';
import { Scene02ProblemReveal } from '../scenes/Scene02ProblemReveal';
import { SceneUnknownLandmarks } from '../scenes/SceneUnknownLandmarks';
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
    id: 'brand-opening',
    title: 'بصيرة · تعلّم، استكشف، تنافس',
    number: 1,
    totalSteps: 1,
    component: SceneBrandOpening,
  },
  {
    id: 'opening',
    title: 'هل تعرف هذا المعلم؟',
    number: 2,
    totalSteps: 1,
    component: Scene01Opening,
  },
  {
    id: 'problem',
    title: 'المعرفة تبدأ بسؤال',
    number: 3,
    totalSteps: 1,
    component: Scene02ProblemReveal,
  },
  {
    id: 'unknown-landmarks',
    title: 'كم من المعالم لا نعرفها في المسجد الاقصى المبارك ؟',
    number: 4,
    totalSteps: 1,
    component: SceneUnknownLandmarks,
  },
  { id: 'basira', title: 'بصيرة', number: 5, totalSteps: 1, component: Scene03BasiraIntro },
  {
    id: 'how-it-works',
    title: 'كيف تعمل المحاكاة؟',
    number: 6,
    totalSteps: 1,
    component: Scene04HowItWorks,
  },
  {
    id: 'landmarks',
    title: 'استعراض المعالم',
    number: 7,
    totalSteps: 1,
    component: Scene05Features,
  },
  {
    id: 'map',
    title: 'الخريطة التفاعلية',
    number: 8,
    totalSteps: 1,
    component: Scene06Audience,
  },
  {
    id: 'quizzes',
    title: 'الاختبارات والتحديات',
    number: 9,
    totalSteps: 1,
    component: Scene07Prototype,
  },
  {
    id: 'competition',
    title: 'المسابقة الجماعية',
    number: 10,
    totalSteps: 1,
    component: Scene08Impact,
  },
  {
    id: 'audience',
    title: 'الفئة المستهدفة',
    number: 11,
    totalSteps: 1,
    component: Scene09Execution,
  },
  {
    id: 'prototype',
    title: 'النموذج الأولي',
    number: 12,
    totalSteps: 1,
    component: Scene10Timeline,
  },
  {
    id: 'impact',
    title: 'الأهداف والأثر المتوقع',
    number: 13,
    totalSteps: 1,
    component: Scene11Budget,
  },
  {
    id: 'execution',
    title: 'خطة التنفيذ',
    number: 14,
    totalSteps: 1,
    component: Scene12Sustainability,
  },
  { id: 'budget', title: 'الميزانية', number: 15, totalSteps: 1, component: Scene13Metrics },
  { id: 'team', title: 'فريق العمل', number: 16, totalSteps: 1, component: Scene14Team },
  { id: 'vision', title: 'الرؤية المستقبلية', number: 17, totalSteps: 1, component: Scene15Vision },
];
