import { updateManager } from "../../main";
import { Point } from "../../types";

export default class SmoothLinePart {

    public start: Point;
    public end: Point;
    public radius: number;

    public current: number = 0;
    public goal: number = 0;

    public strength: number = 10

    private _updateFunctionId: string = '';
    
    constructor(
        public ctx: CanvasRenderingContext2D,
        start: Point,
        end: Point,
        radius?: number
    ) {
        this.start = start;
        this.end = end;
        this.radius = radius || 4;

        // add update function to update manager
        this._updateFunctionId = updateManager.addUpdateFunction(this.step.bind(this), 1000 / 60);
    }
    
    public render() {
        // this.step()
    
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.arc(this.start.x, this.start.y, this.radius, 0, Math.PI * 2);

        // calculate the current point
        const currentPoint = {
            x: this.start.x + (this.end.x - this.start.x) * this.current,
            y: this.start.y + (this.end.y - this.start.y) * this.current,
        };

        this.ctx.moveTo(currentPoint.x, currentPoint.y)
        this.ctx.arc(currentPoint.x, currentPoint.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // draw a line from the current point to the start point 

        this.ctx.save()
        this.ctx.strokeStyle = this.ctx.fillStyle

        this.ctx.lineWidth = this.radius * 2;

        this.ctx.beginPath();
        this.ctx.moveTo(currentPoint.x, currentPoint.y);
        this.ctx.lineTo(this.start.x, this.start.y);
        this.ctx.stroke();

        // DEBUG

        // this.ctx.lineWidth = 1
        // this.ctx.beginPath();
        // // calculate the goal point
        // const goalPoint = {
        //     x: this.start.x + (this.end.x - this.start.x) * this.goal,
        //     y: this.start.y + (this.end.y - this.start.y) * this.goal,
        // }; 

        // this.ctx.moveTo(goalPoint.x, goalPoint.y)
        // this.ctx.arc(goalPoint.x, goalPoint.y, this.radius, 0, Math.PI * 2);
        // this.ctx.stroke();

        // END DEBUG

        this.ctx.restore()
        
    }

    public step() {
        const velocity = (this.goal - this.current) / this.strength;
        this.current += velocity;
    }

    public destroy() {
        updateManager.removeUpdateFunction(this._updateFunctionId);
    }

    public setGoal(goal: number) {
        this.goal = goal;
    }

    public setStartPoint(start: Point) {
        this.start = start;
    }

    public setEndPoint(end: Point) {
        this.end = end;
    }

}