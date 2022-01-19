declare enum GestureEventTypeEnum {
    tap = 0,
    longpress = 1,
    pinch = 2,
    rotate = 3,
    swipe = 4,
    fling = 5,
    pan = 6,
    scroll = 7,
    drag = 8,
    doubletap = 9
}
declare type GestureEventType = keyof typeof GestureEventTypeEnum;
export default abstract class GestureEvent extends TouchEvent {
    constructor(type: GestureEventType, touchEvent: TouchEvent);
}
export {};
