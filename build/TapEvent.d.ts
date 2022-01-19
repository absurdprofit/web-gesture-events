import GestureEvent from './GestureEvent';
export default class TapEvent extends GestureEvent {
    private duration;
    constructor(touchEvent: TouchEvent, duration: number);
}
