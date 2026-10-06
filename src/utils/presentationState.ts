export interface Position {
  sceneIndex: number;
  step: number;
}

export type NavigationAction =
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'first' }
  | { type: 'last' }
  | { type: 'restart' }
  | { type: 'step'; step: number };

export function navigate(
  position: Position,
  action: NavigationAction,
  steps: readonly number[],
): Position {
  if (steps.length === 0 || steps.some((count) => !Number.isInteger(count) || count < 1)) {
    throw new Error('Each presentation scene must have at least one step.');
  }
  const sceneIndex = Math.min(steps.length - 1, Math.max(0, position.sceneIndex));
  const step = Math.min(steps[sceneIndex] - 1, Math.max(0, position.step));
  switch (action.type) {
    case 'next':
      if (step < steps[sceneIndex] - 1) return { sceneIndex, step: step + 1 };
      if (sceneIndex < steps.length - 1) return { sceneIndex: sceneIndex + 1, step: 0 };
      return { sceneIndex, step };
    case 'previous':
      if (step > 0) return { sceneIndex, step: step - 1 };
      if (sceneIndex > 0) {
        return { sceneIndex: sceneIndex - 1, step: steps[sceneIndex - 1] - 1 };
      }
      return { sceneIndex, step };
    case 'first':
      return { sceneIndex: 0, step: 0 };
    case 'last':
      return { sceneIndex: steps.length - 1, step: 0 };
    case 'restart':
      return { sceneIndex, step: 0 };
    case 'step':
      return {
        sceneIndex,
        step: Number.isFinite(action.step)
          ? Math.min(steps[sceneIndex] - 1, Math.max(0, Math.trunc(action.step)))
          : step,
      };
  }
}
