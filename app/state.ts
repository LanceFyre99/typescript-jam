import { settings } from './settings';
import { IInputState } from './types';

export let inputState: IInputState = {
  right: false,
  up: false,
  left: false,
  down: false,
};

export let foodState = {
  exists: false,
  x: null,
  y: null,
};

export const gameState = {
  deltaX: settings.speed,
  deltaY: 0,
  score: 0,
  snake: [],
};
