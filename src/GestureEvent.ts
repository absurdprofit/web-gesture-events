enum GestureEventTypeEnum {
    tap,
    longpress,
    pinch,
    rotate,
    swipe,
    fling,
    pan,
    drag,
    doubletap
}


type GestureEventType = keyof typeof GestureEventTypeEnum;

export default abstract class GestureEvent extends TouchEvent {
    readonly gestureTarget: EventTarget;
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
        this.gestureTarget = touchEvent.touches[0].target ? touchEvent.touches[0].target : window;
    }
}