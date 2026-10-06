import { test } from 'node:test';
import assert from 'node:assert/strict';
import { navigate } from '../src/utils/presentationState.ts';

const steps = [4, 4, 6, 8, 4, 4, 6, 5, 4, 7, 4, 5, 4, 4, 7];
test('reveals every internal step before changing scenes', () => {
  let position = { sceneIndex: 0, step: 0 };
  for (let step = 1; step <= 3; step++) {
    position = navigate(position, { type: 'next' }, steps);
    assert.deepEqual(position, { sceneIndex: 0, step });
  }
  assert.deepEqual(navigate(position, { type: 'next' }, steps), { sceneIndex: 1, step: 0 });
});
test('reverses the entire 15-scene sequence without skipping steps', () => {
  let position = { sceneIndex: 0, step: 0 };
  const history = [position];
  for (let index = 1; index < steps.reduce((sum, count) => sum + count, 0); index++) {
    position = navigate(position, { type: 'next' }, steps);
    history.push(position);
  }
  assert.deepEqual(position, { sceneIndex: 14, step: 6 });
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
  const position = { sceneIndex: 0, step: 1 };
  assert.equal(navigate(position, { type: 'step', step: 50 }, steps).step, 3);
  assert.equal(navigate(position, { type: 'step', step: -2 }, steps).step, 0);
  assert.equal(navigate(position, { type: 'step', step: 2.8 }, steps).step, 2);
  assert.equal(navigate(position, { type: 'step', step: Number.NaN }, steps).step, 1);
});
test('rejects invalid scene definitions', () => {
  assert.throws(() => navigate({ sceneIndex: 0, step: 0 }, { type: 'next' }, []));
  assert.throws(() => navigate({ sceneIndex: 0, step: 0 }, { type: 'next' }, [0]));
});
