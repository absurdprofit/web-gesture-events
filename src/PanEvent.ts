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
    constructor(touchEvent: TouchEvent, panData: PanData) {
        super('pan', touchEvent);
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