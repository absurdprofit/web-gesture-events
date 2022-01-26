import GestureEvent from "./GestureEvent";
interface PinchData {
    scale: number;
}
declare enum PinchLifecycleStateEnum {
    start = 0,
    end = 1
}
declare type PinchLifecycleState = keyof typeof PinchLifecycleStateEnum;
declare abstract class PinchEventBase extends GestureEvent {
    readonly scale: number;
    constructor(touchEvent: TouchEvent, pinchData: PinchData, state?: PinchLifecycleState);
}
export default class PinchEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData);
}
export declare class PinchStartEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData);
}
export declare class PinchEndEvent extends PinchEventBase {
    constructor(touchEvent: TouchEvent, pinchData: PinchData);
}
export {};
