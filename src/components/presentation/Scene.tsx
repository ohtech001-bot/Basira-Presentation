import { Component, type ReactNode } from 'react';
import type { SceneDefinition } from '../../types/presentation';

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="scene-error" role="alert">
          <span>بصيرة</span>
          <h1>تعذّر عرض هذا المشهد</h1>
          <p>استخدم التالي لمتابعة العرض، أو R لإعادة المشهد.</p>
        </div>
      );
    return this.props.children;
  }
}

export function Scene({
  definition,
  currentStep,
  onStepChange,
}: {
  definition: SceneDefinition;
  currentStep: number;
  onStepChange: (step: number) => void;
}) {
  const SceneComponent = definition.component;
  return (
    <SceneBoundary>
      <SceneComponent
        id={definition.id}
        title={definition.title}
        number={definition.number}
        totalSteps={definition.totalSteps}
        currentStep={currentStep}
        onStepChange={onStepChange}
      />
    </SceneBoundary>
  );
}
