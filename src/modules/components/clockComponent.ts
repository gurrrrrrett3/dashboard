import BasicComponent from "../basic/basicComponent";
import { Component } from "../basic/componentTypes";

export default class ClockComponent extends BasicComponent implements Component {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super(ctx);
    this.x = x;
    this.y = y;
  }

  public async render(): Promise<void> {
    this.ctx.save();

    this.ctx.fillStyle = `#fff`;
    this.ctx.font = "75px Arial";

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    const hoursString = hours < 12 ? (hours == 0 ? 12 : hours) : hours - 12;
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    const time = `${hoursString}:${minutesString}:${secondsString}`;
    this.ctx.fillText(time, this.x, this.y);

    const textWidth = this.ctx.measureText(time).width;

    // draw bars representing each digit
    const secondPercent = (milliseconds / 1000) * textWidth;
    const minutePercent = (seconds / 60 + milliseconds / (60 * 1000)) * textWidth;
    const hourPercent = (minutes / 60 + seconds / (60 * 60)) * textWidth;
    const dayPercent = (hours / 24 + hours / (24 * 60)) * textWidth;

    this.ctx.fillStyle = `#f00`;
    this.ctx.fillRect(this.x, this.y + 5, dayPercent, 10);
    this.ctx.fillStyle = `#0f0`;
    this.ctx.fillRect(this.x, this.y + 15, hourPercent, 10);
    this.ctx.fillStyle = `#00f`;
    this.ctx.fillRect(this.x, this.y + 25, minutePercent, 10);
    this.ctx.fillStyle = `#0ff`;
    this.ctx.fillRect(this.x, this.y + 35, secondPercent, 10);

    this.ctx.restore();

    return;
  }

  public update(): void {
    // do nothing
  }
}
