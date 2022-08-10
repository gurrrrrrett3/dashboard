import { Component } from "../../basic/componentTypes";

export interface WindowType {
    id: string;
    components: Map<string, Component>;
    addComponent(component: Component): void;
    removeComponent(component: Component): void;
    getComponent(id: string): Component | undefined;
    render(): Promise<void>;
    update(): void;
}