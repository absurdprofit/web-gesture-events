declare enum GestureEventTypeEnum {
    tap = 0,
    longpress = 1,
    pinchstart = 2,
    pinch = 3,
    pinchend = 4,
    rotatestart = 5,
    rotate = 6,
    rotateend = 7,
    swipestart = 8,
    swipe = 9,
    swipeend = 10,
    panstart = 11,
    pan = 12,
    panend = 13,
    doubletap = 14
}
declare type GestureEventType = keyof typeof GestureEventTypeEnum;
export default abstract class GestureEvent extends TouchEvent {
    readonly gestureTarget: EventTarget;
    readonly x: number;
    readonly y: number;
    constructor(type: GestureEventType, touchEvent: TouchEvent);
}
export {};
