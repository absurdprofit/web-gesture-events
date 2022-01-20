import { GestureEvent } from ".";
declare type Direction = "left" | "right" | "up" | "down";
interface DragData {
    velocity: number;
    direction: Direction;
}
export default class DragEvent extends GestureEvent {
    readonly velocity: number;
    readonly direction: Direction;
    constructor(touchEvent: TouchEvent, dragData: DragData);
}
export {};
