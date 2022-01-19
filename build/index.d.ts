import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
interface GestureProviderConfig {
    longPressDelay: number;
    doubleTapDelay: number;
}
export default class GestureProvider {
    private touchStart;
    private touchMove;
    private touchEnd;
    private touchCancel;
    private touchStartTime;
    private touchEndTime;
    private lastTouchTime;
    private touchMoved;
    private touchStartListener;
    private touchMoveListener;
    private touchEndListener;
    private touchCancelListener;
    config: GestureProviderConfig;
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
    "doubletap": DoubleTapEvent;
}
interface GestureEventProperties {
    longPressDelay: number;
    doubleTapDelay: number;
}
declare global {
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface WindowEventMap extends GestureEventMap, GestureEventProperties {
    }
    interface ElementEventMap extends GestureEventMap, GestureEventProperties {
    }
    interface HTMLElement extends GestureEventMap, GestureEventProperties {
    }
}
export { TapEvent, GestureEvent, LongPressEvent, DoubleTapEvent };
