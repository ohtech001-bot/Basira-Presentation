export interface UiAsset {
  id: string;
  title: string;
  description: string;
  sourceFile: string;
  src: string;
  width: number;
  height: number;
}

const asset = (
  id: string,
  title: string,
  description: string,
  sourceFile: string,
  width = 1672,
  height = 941,
): UiAsset => ({
  id,
  title,
  description,
  sourceFile,
  width,
  height,
  src: `${import.meta.env?.BASE_URL ?? './'}assets/ui/${encodeURIComponent(sourceFile)}`,
});

/** Categorized by visual inspection of all supplied files, preserving the originals. */
export const uiAssets = {
  logo: asset(
    'logo',
    'شعار بصيرة',
    'الشعار الأصلي دون تعديل في اللون أو النسبة',
    'logo.jpeg',
    1254,
    1254,
  ),
  qaytbay: asset(
    'qaytbay-sabil',
    'سبيل قايتباي',
    'الصورة الفوتوغرافية الفعلية للمعلم الافتتاحي',
    'qaytbay-sabil.jpg',
    3262,
    4893,
  ),
  home: asset(
    'home',
    'الواجهة الرئيسية',
    'مدخل التجربة وروابط الاكتشاف والمكتبة والجولات',
    'WhatsApp Image 2026-10-05 at 18.28.25.jpeg',
  ),
  exploration: asset(
    'exploration',
    'التجوّل داخل المحاكاة',
    'التجوّل والوصول إلى المعلم مع بطاقة معلومات في المشهد',
    'WhatsApp Image 2026-10-05 at 18.28.25 (1).jpeg',
  ),
  landmark: asset(
    'landmark',
    'صفحة المعلم',
    'صفحة قبة الصخرة والمعلومات ومعرض الصور التفصيلية',
    'WhatsApp Image 2026-10-05 at 18.28.26 (1).jpeg',
  ),
  tours: asset(
    'tours',
    'الجولات الإرشادية',
    'جولات المعالم والمسارات المختارة',
    'WhatsApp Image 2026-10-05 at 18.28.26 (2).jpeg',
  ),
  library: asset(
    'library',
    'المكتبة المعرفية',
    'المحتوى المعرفي والكتب والمقالات والصور',
    'WhatsApp Image 2026-10-05 at 18.28.26 (3).jpeg',
  ),
  quiz: asset(
    'quiz',
    'الاختبارات',
    'سؤال وإجابة ونقاط وإنجاز في واجهة الاختبار',
    'WhatsApp Image 2026-10-05 at 18.28.26 (4).jpeg',
  ),
  map: asset(
    'map',
    'الخريطة التفاعلية',
    'واجهة خريطة جوية تتضمن المعالم وبطاقة معلومات',
    'WhatsApp Image 2026-10-05 at 18.28.26.jpeg',
  ),
  profile: asset(
    'profile',
    'الملف الشخصي',
    'التقدم الشخصي والزيارات والنقاط والإنجازات',
    'WhatsApp Image 2026-10-05 at 18.28.27 (1).jpeg',
  ),
  competition: asset(
    'competition',
    'المسابقة الجماعية',
    'فريق أزرق وفريق أحمر ووقت ومهام ونقاط وتقدم',
    'WhatsApp Image 2026-10-05 at 18.28.27 (2).jpeg',
  ),
  progress: asset(
    'progress',
    'التحديات ولوحة التقدم',
    'المهام والتحديات والإنجازات ولوحة المتصدرين',
    'WhatsApp Image 2026-10-05 at 18.28.27.jpeg',
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
  3: ['logo'],
  4: ['home', 'map', 'exploration', 'landmark', 'quiz'],
  5: ['landmark', 'exploration', 'tours', 'library'],
  6: ['map', 'qaytbay'],
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
