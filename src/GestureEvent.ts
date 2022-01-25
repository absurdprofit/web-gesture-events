enum GestureEventTypeEnum {
    tap,
    longpress,
    pinch,
    rotate,
    swipe,
    pan,
    doubletap
}


type GestureEventType = keyof typeof GestureEventTypeEnum;

export default abstract class GestureEvent extends TouchEvent {
    readonly gestureTarget: EventTarget;
    readonly x: number;
    readonly y: number;
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
        this.x = touchEvent.touches[0].clientX;
        this.y = touchEvent.touches[0].clientY;
        
    }
}