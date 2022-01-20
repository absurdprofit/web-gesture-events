import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
import SwipeEvent from "./SwipeEvent";
interface GestureProviderConfig {
    longPressDelay: number;
    doubleTapDelay: number;
    minPointers: number;
    numberOfTaps: number;
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
    private touchDown;
    private shouldFire;
    private pointers;
    private touchStartListener;
    private touchMoveListener;
    private touchEndListener;
    private touchCancelListener;
    private currentTarget;
    config: GestureProviderConfig;
    constructor();
    bind(target: Window | EventTarget): void;
    unbind(target: Window | EventTarget): void;
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
    "swipe": SwipeEvent;
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
    interface EventTarget extends GestureEventMap {
        addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    }
}
export { TapEvent, GestureEvent, LongPressEvent, DoubleTapEvent, SwipeEvent };
