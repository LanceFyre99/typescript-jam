export interface IInputState {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
  reset: boolean;
}

export interface IFoodState {
  exists: boolean;
  x: number | null;
  y: number | null;
}

export interface IGameState {
  deltaX: number;
  deltaY: number;
  score: number;
  snake: ISegment[];
  isDead: boolean;
}

export interface ISegment {
  x: number;
  y: number;
  head: boolean;
}

export interface ISettings {
  segmentWidth: number;
  segmentHeight: number;
  startX: number;
  startY: number;
  speed: number;
}
