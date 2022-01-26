import { GestureEvent } from ".";

type Direction = "left" | "right" | "up" | "down";

interface SwipeData {
    velocity: number;
    direction: Direction;
}

enum SwipeLifecycleStateEnum {
    start,
    end
}

type SwipeLifecycleState = keyof typeof SwipeLifecycleStateEnum;

abstract class SwipeEventBase extends GestureEvent {
    readonly velocity: number;
    readonly direction: Direction;
    constructor(touchEvent: TouchEvent, swipeData: SwipeData, state?: SwipeLifecycleState) {
        let eventType: "swipestart" | "swipe" | "swipeend";
        switch(state) {
            case "start":
                eventType = "swipestart";
                break;
            
            case "end":
                eventType = "swipeend";
                break;
            
            default:
                eventType = "swipe";
        }
        super(eventType, touchEvent);
        this.velocity = swipeData.velocity;
        this.direction = swipeData.direction;
    }
}

export default class SwipeEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData) {
        super(touchEvent, swipeData);
    }
}

export class SwipeStartEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData) {
        super(touchEvent, swipeData, "start");
    }
}
export class SwipeEndEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData) {
        super(touchEvent, swipeData, "end");
    }
}