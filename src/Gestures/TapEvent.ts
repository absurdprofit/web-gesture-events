import GestureEvent from './GestureEvent';

export default class TapEvent extends GestureEvent {
    private duration: number = 0;
    constructor(touchEvent: TouchEvent) {
        super('tap', touchEvent);
    }
}