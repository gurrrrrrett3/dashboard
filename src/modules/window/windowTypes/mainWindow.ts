import BasicWindow from "../basic/basicWindow";
import { WindowType } from "../basic/windowTypes";
import ClockComponent from "../../components/clockComponent";
import LightComponent from "../../components/lightComponent";

export default class MainWindow extends BasicWindow implements WindowType {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx, "mainWindow");

        // Add components to the window
        this.addComponent(new ClockComponent(this.ctx, 0, 100));
        this.addComponent(new LightComponent(this.ctx, 0, 500));
    }
}