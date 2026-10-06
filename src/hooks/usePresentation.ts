import { useCallback, useReducer } from 'react';
import { scenes } from '../config/scenes';
import { navigate, type NavigationAction, type Position } from '../utils/presentationState';

interface State extends Position {
  revision: number;
  direction: number;
}

const steps = scenes.map((scene) => scene.totalSteps);
function reducer(state: State, action: NavigationAction): State {
  const position = navigate(state, action, steps);
  if (
    position.sceneIndex === state.sceneIndex &&
    position.step === state.step &&
    action.type !== 'restart'
  )
    return state;
  return {
    ...position,
    revision: state.revision + (action.type === 'restart' ? 1 : 0),
    direction: action.type === 'previous' || action.type === 'first' ? -1 : 1,
  };
}

export function usePresentation() {
  const [state, dispatch] = useReducer(reducer, {
    sceneIndex: 0,
    step: 0,
    revision: 0,
    direction: 1,
  });
  const next = useCallback(() => dispatch({ type: 'next' }), []);
  const previous = useCallback(() => dispatch({ type: 'previous' }), []);
  const first = useCallback(() => dispatch({ type: 'first' }), []);
  const last = useCallback(() => dispatch({ type: 'last' }), []);
  const restart = useCallback(() => dispatch({ type: 'restart' }), []);
  const onStepChange = useCallback((step: number) => dispatch({ type: 'step', step }), []);
  const scene = scenes[state.sceneIndex];
  return {
    ...state,
    scene,
    next,
    previous,
    first,
    last,
    restart,
    onStepChange,
    isFirst: state.sceneIndex === 0 && state.step === 0,
    isLast: state.sceneIndex === scenes.length - 1 && state.step === scene.totalSteps - 1,
  };
}
