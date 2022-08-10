import BasicComponent from "../basic/basicComponent";
import { Component } from "../basic/componentTypes";
import SmoothLinePart from "../parts/smoothLinePart";

export default class ClockComponent extends BasicComponent implements Component {

  public bars: { [key: string]: SmoothLinePart } = {
    dayBar: new SmoothLinePart(this.ctx, { x: this.x, y: this.y + 5 }, { x: window.innerWidth, y: this.y + 5 }),
    hourBar: new SmoothLinePart(this.ctx, { x: this.x, y: this.y + 15 }, { x: window.innerWidth, y: this.y + 15 }),
    minuteBar: new SmoothLinePart(this.ctx, { x: this.x, y: this.y + 25 }, { x: window.innerWidth, y: this.y + 25 }),
    secondBar: new SmoothLinePart(this.ctx, { x: this.x, y: this.y + 35 }, { x: window.innerWidth, y: this.y + 35 }),
  };

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

    // draw bars representing each digit
    const secondPercent = (milliseconds / 1000)
    const minutePercent = (seconds / 60 + milliseconds / (60 * 1000))
    const hourPercent = (minutes / 60 + seconds / (60 * 60))
    const dayPercent = (hours / 24 + hours / (24 * 60))

    // lower the second bar strength to make it more accurate
    this.bars.secondBar.strength = 3

    this.ctx.fillStyle = `#f00`;
    this.bars.dayBar.setGoal(dayPercent);
    this.bars.dayBar.render();
    this.ctx.fillStyle = `#0f0`;
    this.bars.hourBar.setGoal(hourPercent);
    this.bars.hourBar.render();
    this.ctx.fillStyle = `#00f`;
    this.bars.minuteBar.setGoal(minutePercent);
    this.bars.minuteBar.render();
    this.ctx.fillStyle = `#0ff`;
    this.bars.secondBar.setGoal(secondPercent);
    this.bars.secondBar.render(); 

    this.ctx.restore();

    return;
  }

  public update(): void {
    // do nothing
  }
}
