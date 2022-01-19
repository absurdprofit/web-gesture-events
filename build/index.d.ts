import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
export default class GestureProvider {
    private touchStart;
    private touchMove;
    private touchEnd;
    private touchCancel;
    private touchStartTime;
    private touchMoved;
    private touchStartListener;
    private touchMoveListener;
    private touchEndListener;
    private touchCancelListener;
    constructor();
    bind(): void;
    unbind(): void;
    clean(): void;
    onTouchStart(touchStart: TouchEvent): void;
    onTouchMove(touchMove: TouchEvent): void;
    onTouchEnd(touchEnd: TouchEvent): void;
    onTouchCancel(touchCancel: TouchEvent): void;
}
interface GestureEventMap {
    "tap": TapEvent;
    "longpress": LongPressEvent;
}
declare global {
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface WindowEventMap extends GestureEventMap {
    }
    interface ElementEventMap extends GestureEventMap {
    }
    interface HTMLElement extends GestureEventMap {
    }
}
export { TapEvent, GestureEvent, LongPressEvent };
