import { Point } from "../../types";

export default class RoundedLinePart {
  public start: Point;
  public end: Point;
  public radius: number;

  constructor(
    public ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    radius?: number
  ) {
    this.start = start;
    this.end = end;
    this.radius = radius || 4;
  }

  public render() {
    this.ctx.save()

    this.ctx.strokeStyle = this.ctx.fillStyle
    this.ctx.lineWidth = this.radius * 2;

    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.arc(this.start.x, this.start.y, this.radius, 0, Math.PI * 2);
    this.ctx.moveTo(this.end.x, this.end.y);
    this.ctx.arc(this.end.x, this.end.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill()
    this.ctx.lineTo(this.start.x, this.start.y);
    this.ctx.stroke();    

    this.ctx.restore()
  }
}
