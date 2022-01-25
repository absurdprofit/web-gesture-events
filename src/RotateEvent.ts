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

export default class RotateEvent extends GestureEvent {
    readonly anchor: Anchor;
    declare readonly rotation: number; // already exists only in iOS as readonly. This avoids TypeError. 
    readonly rotationDeg: number;

    constructor(touchEvent: TouchEvent, rotationData: RotationData) {
        super('rotate', touchEvent);
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