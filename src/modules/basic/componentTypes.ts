export interface BasicComponent {
    id: string;
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
}

export interface Component extends BasicComponent {
    render(): Promise<void>;
    update(): void;
    [key: string]: any;
}