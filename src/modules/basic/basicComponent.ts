import Utils from "../../utils"
export default class BasicComponent implements BasicComponent {
    
    public id: string
    public x: number
    public y: number

    constructor(public ctx: CanvasRenderingContext2D) {
        this.id = Utils.randomKey(10)
        this.x = 0
        this.y = 0
    }

}