import { GestureEvent } from ".";
declare type Direction = "left" | "right" | "up" | "down";
interface SwipeData {
    velocity: number;
    direction: Direction;
}
declare enum SwipeLifecycleStateEnum {
    start = 0,
    end = 1
}
declare type SwipeLifecycleState = keyof typeof SwipeLifecycleStateEnum;
declare abstract class SwipeEventBase extends GestureEvent {
    readonly velocity: number;
    readonly direction: Direction;
    constructor(touchEvent: TouchEvent, swipeData: SwipeData, state?: SwipeLifecycleState);
}
export default class SwipeEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData);
}
export declare class SwipeStartEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData);
}
export declare class SwipeEndEvent extends SwipeEventBase {
    constructor(touchEvent: TouchEvent, swipeData: SwipeData);
}
export {};
