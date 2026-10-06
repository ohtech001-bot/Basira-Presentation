import { MotionConfig } from 'framer-motion';
import { Presentation } from './components/presentation/Presentation';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Presentation />
    </MotionConfig>
  );
}
