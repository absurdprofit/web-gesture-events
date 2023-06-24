import GestureEvent from './GestureEvent';

export default class LongPressEvent extends GestureEvent {
    public readonly duration: number = 0;
    constructor(touchEvent: TouchEvent, duration: number) {
        super('longpress', touchEvent);
        this.duration = duration;
    }
}