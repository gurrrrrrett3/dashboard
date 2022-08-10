import { WindowType } from "../window/basic/windowTypes";
import MainWindow from "../window/windowTypes/mainWindow";

export default class WindowManger {
    
    public windows = new Map<string, WindowType>();
    public currentWindow: string
    
    constructor(public ctx: CanvasRenderingContext2D) {

        // add windows

        this.addWindow(new MainWindow(ctx));

        this.currentWindow = "mainWindow";
    }

    public addWindow(window: WindowType): void {
        this.windows.set(window.id, window);
    }

    public removeWindow(window: WindowType): void {
        this.windows.delete(window.id);
    }

    public getWindow(id: string): WindowType | undefined {
        return this.windows.get(id);
    }

    public setWindow(id: string) {
        this.currentWindow = id;
    }
    
    public async render(): Promise<void> {
        const window = this.getWindow(this.currentWindow);
        if (window) {
            return window.render();
        }
        return 
    }

    public async update(): Promise<void> {
        const window = this.getWindow(this.currentWindow);
        if (window) {
            return window.update();
        }
        return 
    }
}