import GestureEvent from "./GestureEvent";

interface PinchData {
    scale: number;
}

enum PinchLifecycleStateEnum {
    start,
    end
}

type PinchLifecycleState = keyof typeof PinchLifecycleStateEnum;

abstract class PinchEventBase extends GestureEvent {
    declare readonly scale: number; // already exists only in iOS as readonly. This avoids TypeError. 
    constructor(touchEvent: TouchEvent, pinchData: PinchData, state?: PinchLifecycleState) {
        let eventType: "pinchstart" | "pinch" | "pinchend";
        switch(state) {
            case "start":
                eventType = "pinchstart";
                break;
            
            case "end":
                eventType = "pinchend";
                break;
            
            default:
                eventType = "pinch";
        }
        super(eventType, touchEvent);
        Object.defineProperty(this, 'scale', {
            value: pinchData.scale,
            writable: false
        });
    } 
}

export default class PinchEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData) {
        super(touchEvent, pinchData);
    }
}
export class PinchStartEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData) {
        super(touchEvent, pinchData, "start");
    }
}
export class PinchEndEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData) {
        super(touchEvent, pinchData, "end");
    }
}