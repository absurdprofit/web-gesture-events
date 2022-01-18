enum GestureEventTypeEnum {
    tap,
    longpress,
    pinch,
    rotate,
    swipe,
    fling,
    pan,
    scroll,
    drag,
    doubletap
}

type GestureEventType = keyof typeof GestureEventTypeEnum;

export default abstract class GestureEvent extends TouchEvent {
    constructor(type: GestureEventType, touchEvent: TouchEvent) {
        super(type, {
            touches: Array.from(touchEvent.touches),
            targetTouches: Array.from(touchEvent.targetTouches),
            changedTouches: Array.from(touchEvent.changedTouches),
            ctrlKey: touchEvent.ctrlKey,
            shiftKey: touchEvent.shiftKey,
            altKey: touchEvent.altKey,
            metaKey: touchEvent.metaKey
        });
    }
}