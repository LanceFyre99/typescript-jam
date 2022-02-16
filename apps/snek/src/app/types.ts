export interface IInputState {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
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
}

export interface ISegment {
  x: number;
  y: number;
  head: boolean;
}

export interface ISettings {
  startX: number;
  startY: number;
  speed: number;
}
