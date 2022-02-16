import { ISegment } from './types';

export class Segment implements ISegment {
  public x: number;
  public y: number;
  public head: boolean;

  constructor(x: number, y: number, head = false) {
    this.x = x;
    this.y = y;
    this.head = head;
  }
}
