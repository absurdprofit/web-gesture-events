import GestureEvent from "./GestureEvent";
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
    readonly rotation: number;
    readonly rotationDeg: number;
    constructor(touchEvent: TouchEvent, rotationData: RotationData);
}
export {};
