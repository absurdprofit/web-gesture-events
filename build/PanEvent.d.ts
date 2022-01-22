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
export default class PanEvent extends GestureEvent {
    readonly translation: Translation;
    readonly velocity: number;
    constructor(touchEvent: TouchEvent, panData: PanData);
}
export {};
