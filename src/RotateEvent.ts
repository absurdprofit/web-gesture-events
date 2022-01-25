import GestureEvent from "./GestureEvent";
import { Vec2 } from "./utils";

interface RotationData {
    anchor: Vec2;
    rotation: number;
    rotationDeg: number;
}

export default class RotateEvent extends GestureEvent {
    readonly anchor: Vec2;
    readonly rotation: number;
    readonly rotationDeg: number;

    constructor(touchEvent: TouchEvent, rotationData: RotationData) {
        super('rotate', touchEvent);
        this.anchor = rotationData.anchor;
        this.rotation = rotationData.rotation;
        this.rotationDeg = rotationData.rotationDeg;
    }
}