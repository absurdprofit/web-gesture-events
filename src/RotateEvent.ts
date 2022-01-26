import GestureEvent from "./GestureEvent";
import { Vec2 } from "./utils";

interface Anchor {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
}
interface RotationData {
    anchor: Anchor;
    rotation: number;
    rotationDeg: number;
}

enum RotateLifecycleStateEnum {
    start,
    end
}

type RotateLifecycleState = keyof typeof RotateLifecycleStateEnum;

abstract class RotateEventBase extends GestureEvent {
    readonly anchor: Anchor;
    declare readonly rotation: number; // already exists only in iOS as readonly. This avoids TypeError. 
    readonly rotationDeg: number;

    constructor(touchEvent: TouchEvent, rotationData: RotationData, state?: RotateLifecycleState) {
        let eventType: "rotatestart" | "rotateend" | "rotate";
        switch (state) {
            case "start":
                eventType = "rotatestart";
                break;
            
            case "end":
                eventType = "rotateend";
                break;
            
            default:
                eventType = "rotate";
        }
        super(eventType, touchEvent);
        this.anchor = {
            x: rotationData.anchor.x,
            y: rotationData.anchor.y,
            clientX: rotationData.anchor.clientX,
            clientY: rotationData.anchor.clientY
        };
        Object.defineProperty(this, 'rotation', {
            value: rotationData.rotation,
            writable: false
        });
        this.rotationDeg = rotationData.rotationDeg;
    }
}
export default class RotateEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData) {
        super(touchEvent, rotationData);
    }
}
export class RotateStartEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData) {
        super(touchEvent, rotationData, "start");
    }
}
export class RotateEndEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData) {
        super(touchEvent, rotationData, "end");
    }
}