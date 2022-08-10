import { Component } from "../../basic/componentTypes";
import { WindowType } from "./windowTypes";

export default class BasicWindow implements WindowType {

    public components: Map<string, Component> = new Map<string, Component>();

    constructor(public ctx: CanvasRenderingContext2D, public id: string) {}

    public addComponent(component: Component): void {
        this.components.set(component.id, component);
    }

    public removeComponent(component: Component): void {
        this.components.delete(component.id);
    }

    public getComponent(id: string): Component | undefined {
        return this.components.get(id);
    }

    public async update(): Promise<void> {
        for (const component of this.components.values()) {
            component.update();
        }
    }

    public async render(): Promise<void> {
        for (const component of this.components.values()) {
            await component.render();
        }
    }
}