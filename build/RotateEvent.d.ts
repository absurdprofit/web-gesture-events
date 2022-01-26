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
declare enum RotateLifecycleStateEnum {
    start = 0,
    end = 1
}
declare type RotateLifecycleState = keyof typeof RotateLifecycleStateEnum;
declare abstract class RotateEventBase extends GestureEvent {
    readonly anchor: Anchor;
    readonly rotation: number;
    readonly rotationDeg: number;
    constructor(touchEvent: TouchEvent, rotationData: RotationData, state?: RotateLifecycleState);
}
export default class RotateEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData);
}
export declare class RotateStartEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData);
}
export declare class RotateEndEvent extends RotateEventBase {
    constructor(touchEvent: TouchEvent, rotationData: RotationData);
}
export {};
