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
declare enum PanLifecycleStateEnum {
    start = 0,
    end = 1
}
declare type PanLifecycleState = keyof typeof PanLifecycleStateEnum;
declare abstract class PanEventBase extends GestureEvent {
    readonly translation: Translation;
    readonly velocity: number;
    constructor(touchEvent: TouchEvent, panData: PanData, state?: PanLifecycleState);
}
export default class PanEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData);
}
export declare class PanStartEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData);
}
export declare class PanEndEvent extends PanEventBase {
    constructor(touchEvent: TouchEvent, panData: PanData);
}
export {};
