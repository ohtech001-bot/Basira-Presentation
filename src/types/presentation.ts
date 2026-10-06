import type { ComponentType } from 'react';

export interface SceneProps {
  id: string;
  title: string;
  number: number;
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export interface SceneDefinition {
  id: string;
  title: string;
  number: number;
  totalSteps: number;
  component: ComponentType<SceneProps>;
}

export interface PresentationPosition {
  sceneIndex: number;
  step: number;
}
