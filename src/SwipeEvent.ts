import { GestureEvent } from ".";

type Direction = "left" | "right" | "up" | "down";

interface DragData {
    velocity: number;
    direction: Direction;
}

export default class DragEvent extends GestureEvent {
    readonly velocity: number;
    readonly direction: Direction;
    constructor(touchEvent: TouchEvent, swipeData: DragData) {
        super('swipe', touchEvent);
        this.velocity = swipeData.velocity;
        this.direction = swipeData.direction;
    }
}