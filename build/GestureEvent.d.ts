declare enum GestureEventTypeEnum {
    tap = 0,
    longpress = 1,
    pinch = 2,
    rotate = 3,
    swipe = 4,
    pan = 5,
    doubletap = 6
}
declare type GestureEventType = keyof typeof GestureEventTypeEnum;
export default abstract class GestureEvent extends TouchEvent {
    readonly gestureTarget: EventTarget;
    readonly x: number;
    readonly y: number;
    constructor(type: GestureEventType, touchEvent: TouchEvent);
}
export {};
