import GestureEvent from './GestureEvent';

export default class TapEvent extends GestureEvent {
    constructor(touchEvent: TouchEvent) {
        super('tap', touchEvent);
    }
}