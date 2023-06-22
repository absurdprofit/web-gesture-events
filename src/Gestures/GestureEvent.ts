enum GestureEventTypeEnum {
    tap,
    longpress,
    pinchstart,
    pinch,
    pinchend,
    rotatestart,
    rotate,
    rotateend,
    swipestart,
    swipe,
    swipeend,
    panstart,
    pan,
    panend,
    doubletap
}


type GestureEventType = keyof typeof GestureEventTypeEnum;
if (window.TouchEvent === undefined) {
    // avoid breaking in WebKit environments
    (window as any).TouchEvent = PointerEvent;
}
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
            metaKey: touchEvent.metaKey,
            bubbles: true,
            cancelable: true
        });
        if (type.includes("end") || touchEvent.type.includes("end")) {
            this.gestureTarget = touchEvent.changedTouches[0].target;
            this.x = touchEvent.changedTouches[0].clientX;
            this.y = touchEvent.changedTouches[0].clientY;
            return;
        }
        this.gestureTarget = touchEvent.touches[0].target;
        this.x = touchEvent.touches[0].clientX;
        this.y = touchEvent.touches[0].clientY;
        
    }
}