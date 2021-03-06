import { Segment } from './Segment';
import { settings } from './settings';
import { IFoodState, IGameState, IInputState } from './types';

export let inputState: IInputState = {
  right: false,
  up: false,
  left: false,
  down: false,
  reset: false,
};

export let foodState: IFoodState = {
  exists: false,
  x: null,
  y: null,
};

export let gameState: IGameState = {
  deltaX: settings.speed,
  deltaY: 0,
  score: 0,
  snake: [],
  isDead: false,
};
