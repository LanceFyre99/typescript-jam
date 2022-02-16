export class Segment {
  x: number;
  y: number;
  head: boolean;
  constructor(x, y, head = false) {
    this.x = x;
    this.y = y;
    this.head = head;
  }
}
