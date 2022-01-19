import GestureEvent from './GestureEvent';
export default class LongPressEvent extends GestureEvent {
    private duration;
    constructor(touchEvent: TouchEvent, duration: number);
}
