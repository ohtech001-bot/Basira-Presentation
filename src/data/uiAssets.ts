export interface UiAsset {
  id: string;
  title: string;
  description: string;
  /** Original user-supplied filename, retained unmodified under ui/. */
  sourceFile: string;
  /** Optimized display filename under public/assets/ui/. */
  servedFile: string;
  src: string;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
}

const asset = (
  id: string,
  title: string,
  description: string,
  sourceFile: string,
  servedFile: string,
  width: number,
  height: number,
  sourceWidth = width,
  sourceHeight = height,
): UiAsset => ({
  id,
  title,
  description,
  sourceFile,
  servedFile,
  width,
  height,
  sourceWidth,
  sourceHeight,
  src: `${import.meta.env?.BASE_URL ?? './'}assets/ui/${encodeURIComponent(servedFile)}`,
});

/** All 17 supplied images, with optimized copies that retain their complete frames. */
export const uiAssets = {
  logo: asset(
    'logo',
    'شعار بصيرة',
    'الشعار الأصلي محفوظ دون تعديل في اللون أو النسبة أو الملف',
    'logo.jpeg',
    'logo.jpeg',
    1254,
    1254,
  ),
  qaytbay: asset(
    'qaytbay-sabil',
    'سبيل قايتباي',
    'الصورة الفوتوغرافية الفعلية للمعلم الافتتاحي',
    'qaytbay-sabil.jpg',
    'qaytbay.webp',
    1280,
    1920,
    3262,
    4893,
  ),
  home: asset(
    'home',
    'الواجهة الرئيسية',
    'مدخل المنظومة وروابط المحاكاة والمكتبة والخريطة والجولات',
    'الرئيسية.png',
    'home.webp',
    1672,
    941,
  ),
  exploration: asset(
    'exploration',
    'السير في المحاكاة',
    'تجربة التجول بالقرب من سبيل قايتباي والتفاعل مع المعلم',
    'السير في المحاكاة.png',
    'exploration.webp',
    1672,
    941,
  ),
  landmark: asset(
    'landmark',
    'شرح سبيل قايتباي',
    'صفحة المعلم ومعلوماته التاريخية ومعرض الصور',
    'شرح سبيل قايتباي.png',
    'landmark.webp',
    1672,
    941,
  ),
  dome: asset(
    'dome',
    'قبة الصخرة',
    'واجهة تفصيلية لمعلم قبة الصخرة ومحتواه المعرفي',
    'قبة الصخرة.jpeg',
    'قبة الصخرة.jpeg',
    1672,
    941,
  ),
  tours: asset(
    'tours',
    'الجولات التعليمية',
    'جولات تعليمية لاكتشاف معالم المسجد الأقصى ومساراته',
    'الجولات التعليمية.jpg',
    'tours.webp',
    1920,
    1081,
    5225,
    2941,
  ),
  guidedTours: asset(
    'guidedTours',
    'الجولات الإرشادية',
    'واجهة الجولات الإرشادية ومدة الجولة ومحطاتها',
    'جولات ارشادية.jpeg',
    'جولات ارشادية.jpeg',
    1672,
    941,
  ),
  library: asset(
    'library',
    'المكتبة المعرفية',
    'المحتوى المعرفي ومعالم الأقصى ومواد القراءة',
    'المكتبة المعرفية_ معالم الأقصى.png',
    'library.webp',
    1672,
    941,
  ),
  quiz: asset(
    'quiz',
    'اختبر معلوماتك',
    'سؤال معرفي وإجابة صحيحة ونقاط داخل الاختبار',
    'اختبر معلوماتك.png',
    'quiz.webp',
    1672,
    941,
  ),
  questions: asset(
    'questions',
    'أسئلة معرفية',
    'واجهة سؤال متعدد الخيارات والتقدم بين الأسئلة',
    'اسئلة.jpeg',
    'اسئلة.jpeg',
    1672,
    941,
  ),
  map: asset(
    'map',
    'الخريطة التفاعلية',
    'الخريطة الجوية والمعالم ومسار الاستكشاف',
    'الخريطة التفاعلية.jpg',
    'map.webp',
    1920,
    1081,
    5225,
    2941,
  ),
  profile: asset(
    'profile',
    'صفحة الزائر',
    'ملخص التقدم والمعالم المكتشفة والنقاط والإنجازات',
    'صفحة الزائر.jpeg',
    'صفحة الزائر.jpeg',
    1672,
    941,
  ),
  profileDetail: asset(
    'profileDetail',
    'تفاصيل صفحة الزائر',
    'المهام والإنجازات ولوحة المتصدرين في حساب الزائر',
    'صفحة الزائر 2.jpeg',
    'صفحة الزائر 2.jpeg',
    1672,
    941,
  ),
  competition: asset(
    'competition',
    'المسابقة الجماعية',
    'فرق متنافسة ونقاط ومسارات وهدف معرفي مشترك',
    'مسابقة جماعية.jpg',
    'competition.webp',
    1920,
    1081,
    5225,
    2941,
  ),
  progress: asset(
    'progress',
    'تقدم الرحلة',
    'المعالم والمهام المكتملة وشريط التقدم والإنجازات',
    'تقدم الرحلة.png',
    'progress.webp',
    1672,
    941,
  ),
  mission: asset(
    'mission',
    'المهمة الحالية',
    'مهمة الوصول إلى سبيل قايتباي مع مسار داخل الخريطة',
    'المهمة الحالية.jpg',
    'mission.webp',
    1920,
    1081,
    5225,
    2941,
  ),
} as const;

export type UiAssetKey = keyof typeof uiAssets;
export const interfaceAssets = Object.values(uiAssets).filter(
  ({ id }) => !['logo', 'qaytbay-sabil'].includes(id),
);

/** Keep near-scene preloads bounded; far scenes remain on demand. */
export const sceneAssetKeys: Record<number, readonly UiAssetKey[]> = {
  1: ['qaytbay'],
  2: ['qaytbay'],
  3: ['logo', 'exploration'],
  4: ['exploration', 'map', 'landmark'],
  5: ['landmark', 'dome', 'library', 'tours'],
  6: ['map', 'mission'],
  7: ['quiz', 'profile', 'progress'],
  8: ['competition'],
  9: [],
  10: ['home', 'map', 'exploration', 'landmark', 'quiz', 'competition'],
  11: ['exploration'],
  12: [],
  13: [],
  14: [],
  15: ['logo'],
};
