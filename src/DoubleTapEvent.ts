import GestureEvent from './GestureEvent';

export default class DoubleTapEvent extends GestureEvent {
    constructor(touchEvent: TouchEvent) {
        super('doubletap', touchEvent);
    }
}