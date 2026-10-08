import { test } from 'node:test';
import assert from 'node:assert/strict';
import { navigate } from '../src/utils/presentationState.ts';
import { scenes } from '../src/config/scenes.ts';

const steps = scenes.map((scene) => scene.totalSteps);
test('every configured slide is complete and the next click changes slides', () => {
  assert.equal(steps.length, 15);
  assert.ok(steps.every((stepCount) => stepCount === 1));
  let position = { sceneIndex: 0, step: 0 };
  for (let slide = 1; slide < scenes.length; slide++) {
    position = navigate(position, { type: 'next' }, steps);
    assert.deepEqual(position, { sceneIndex: slide, step: 0 });
  }
  assert.deepEqual(navigate(position, { type: 'next' }, steps), position);
});
test('reverses the entire 15-slide sequence without extra reveal clicks', () => {
  let position = { sceneIndex: 0, step: 0 };
  const history = [position];
  for (let index = 1; index < steps.reduce((sum, count) => sum + count, 0); index++) {
    position = navigate(position, { type: 'next' }, steps);
    history.push(position);
  }
  assert.deepEqual(position, { sceneIndex: 14, step: 0 });
  assert.deepEqual(navigate(position, { type: 'next' }, steps), position);
  for (let index = history.length - 2; index >= 0; index--) {
    position = navigate(position, { type: 'previous' }, steps);
    assert.deepEqual(position, history[index]);
  }
  assert.deepEqual(navigate(position, { type: 'previous' }, steps), position);
});
test('Home, End and restart return to step zero', () => {
  const position = { sceneIndex: 6, step: 2 };
  assert.deepEqual(navigate(position, { type: 'first' }, steps), { sceneIndex: 0, step: 0 });
  assert.deepEqual(navigate(position, { type: 'last' }, steps), { sceneIndex: 14, step: 0 });
  assert.deepEqual(navigate(position, { type: 'restart' }, steps), { sceneIndex: 6, step: 0 });
});
test('onStepChange safely clamps invalid step requests', () => {
  const position = { sceneIndex: 0, step: 0 };
  assert.equal(navigate(position, { type: 'step', step: 50 }, steps).step, 0);
  assert.equal(navigate(position, { type: 'step', step: -2 }, steps).step, 0);
  assert.equal(navigate(position, { type: 'step', step: 2.8 }, steps).step, 0);
  assert.equal(navigate(position, { type: 'step', step: Number.NaN }, steps).step, 0);
});
test('rejects invalid scene definitions', () => {
  assert.throws(() => navigate({ sceneIndex: 0, step: 0 }, { type: 'next' }, []));
  assert.throws(() => navigate({ sceneIndex: 0, step: 0 }, { type: 'next' }, [0]));
});
