import GestureEvent from "./GestureEvent";

interface PinchData {
    scale: number;
}

export default class PinchEvent extends GestureEvent {
    readonly scale: number;
    constructor(touchEvent: TouchEvent, pinchData: PinchData) {
        super('pinch', touchEvent);
        this.scale = pinchData.scale;
    } 
}