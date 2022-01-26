import GestureEvent from "./GestureEvent";
import { Vec2 } from "./utils";

interface Translation {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    magnitude: number;
    clientMagnitude: number;
}

interface PanData {
    translation: Vec2;
    velocity: number;
}

enum PanLifecycleStateEnum {
    start,
    end
}

type PanLifecycleState = keyof typeof PanLifecycleStateEnum;

abstract class PanEventBase extends GestureEvent {
    readonly translation: Translation;
    readonly velocity: number;
    constructor(touchEvent: TouchEvent, panData: PanData, state?: PanLifecycleState) {
        let eventType: "panstart" | "pan" | "panend";
        switch(state) {
            case "start":
                eventType = "panstart";
                break;
            
            case "end":
                eventType = "panend";
                break;
            
            default:
                eventType = "pan";
        }
        super(eventType, touchEvent);
        this.velocity = panData.velocity;
        this.translation = {
            x: panData.translation.x,
            y: panData.translation.y,
            magnitude: panData.translation.magnitude,
            clientX: panData.translation.clientX,
            clientY: panData.translation.clientY,
            clientMagnitude: panData.translation.clientMagnitude
        };
    }
}

export default class PanEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData) {
        super(touchEvent, panData);
    }
}
export class PanStartEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData) {
        super(touchEvent, panData, "start");
    }
}
export class PanEndEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData) {
        super(touchEvent, panData, "end");
    }
}