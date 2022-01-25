import GestureEvent from "./GestureEvent";

interface PinchData {
    scale: number;
}


export default class PinchEvent extends GestureEvent {
    declare readonly scale: number; // already exists only in iOS as readonly. This avoids TypeError. 
    constructor(touchEvent: TouchEvent, pinchData: PinchData) {
        super('pinch', touchEvent);
        Object.defineProperty(this, 'scale', {
            value: pinchData.scale,
            writable: false
        });
    } 
}