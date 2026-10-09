import { motion, useReducedMotion } from 'framer-motion';
import { ProductScene } from '../components/presentation/ProductScene';
import { UiImage } from '../components/ui/UiImage';
import { uiAssets } from '../data/uiAssets';
import type { SceneProps } from '../types/presentation';

export function SceneUnknownLandmarks({ number }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const landmarks = [
    { asset: uiAssets.basitiyaSchool, name: 'المدرسة الباسطية' },
    { asset: uiAssets.ghadiriyaSchool, name: 'المدرسة الغادرية' },
    { asset: uiAssets.muhaddithiyaSchool, name: 'المدرسة المحدثية' },
    { asset: uiAssets.qattaninGate, name: 'باب القطانين' },
    { asset: uiAssets.busiriSabil, name: 'سبيل البصيري' },
    { asset: uiAssets.magharibaSabil, name: 'سبيل باب المغاربة' },
    { asset: uiAssets.yusufAghaDome, name: 'قبة يوسف آغا' },
    { asset: uiAssets.jasminePlatform, name: 'مسطبة الورود / الياسمينة' },
  ];

  return (
    <ProductScene
      title="كم من المعالم لا نعرفها في المسجد الاقصى المبارك ؟"
      number={number}
      subtitle="أبواب، مدارس، أسبلة، قباب، ومصاطب… لكل معلم حكاية"
      className="basira-unknown-landmarks"
    >
      <div className="unknown-landmarks-grid">
        {landmarks.map(({ asset, name }, index) => (
          <motion.figure
            key={asset.id}
            className="unknown-landmark-card"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.42,
              delay: reducedMotion ? 0 : index * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="unknown-landmark-photo">
              <UiImage asset={asset} alt={name} fit="contain" />
            </div>
            <figcaption>
              <i aria-hidden="true" />
              <span>{name}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </ProductScene>
  );
}
