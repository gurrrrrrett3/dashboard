import BasicComponent from "../basic/basicComponent";
import { Component } from "../basic/componentTypes";

export default class ClockComponent extends BasicComponent implements Component {
    
    public isMenu: boolean = false
    public keys = ""

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super(ctx);
        this.x = x;
        this.y = y;

        window.addEventListener("keyup", (e) => {
            if (e.key === "q") {
                this.isMenu = true
            }

            let validKeys = "0123456789abcdef"

            if (validKeys.includes(e.key)) {
                this.keys += e.key
            }

            // backspace
            if (e.key === "Backspace") {
                this.keys = this.keys.slice(0, -1)
            }

            // escape
            if (e.key === "Escape") {
                this.isMenu = false
                this.keys = ""
            }

            // enter
            if (e.key === "Enter") {
                if (this.keys.length == 3) {
                    // double up the keys
                    this.keys = this.keys.split("").map(key => key + key).join("")
                }

                // send request to server
                fetch("/api/setColor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        color: this.keys
                    })
                })
                
                this.keys = ""
                this.isMenu = false
            }
        })
    }

    public async render(): Promise<void> {
        this.ctx.save()

        
        
       if (this.isMenu) {

            this.ctx.fillStyle = "#00000070"
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

            this.ctx.fillStyle = `#fff`;
            this.ctx.font = "75px Arial";

            this.ctx.fillText("Enter a color:", this.x, this.y);

            if (this.keys.length == 3 || this.keys.length == 6) {
                this.ctx.fillStyle = `#${this.keys}`;
            }
            this.ctx.fillText(this.keys, this.x, this.y + 75);
        }

        this.ctx.restore()

        return
    }

    public update(): void {
        // do nothing
    }
}