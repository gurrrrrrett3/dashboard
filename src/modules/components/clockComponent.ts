import BasicComponent from "../basic/basicComponent";
import { Component } from "../basic/componentTypes";

export default class ClockComponent extends BasicComponent implements Component {
    
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super(ctx);
        this.x = x;
        this.y = y;
    }

    public async render(): Promise<void> {
        this.ctx.save()
        
        this.ctx.fillStyle = `#fff`;
        this.ctx.font = "75px Arial";

        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const hoursString = hours < 10 ? `0${hours}` : hours;
        const minutesString = minutes < 10 ? `0${minutes}` : minutes;
        const secondsString = seconds < 10 ? `0${seconds}` : seconds;

        const time = `${hoursString}:${minutesString}:${secondsString}`;  
        this.ctx.fillText(time, this.x, this.y);

        this.ctx.restore()

        return
    }

    public update(): void {
        // do nothing
    }
}