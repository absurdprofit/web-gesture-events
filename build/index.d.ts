import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
import SwipeEvent, { SwipeEndEvent, SwipeStartEvent } from "./SwipeEvent";
import PanEvent, { PanEndEvent, PanStartEvent } from "./PanEvent";
import PinchEvent, { PinchEndEvent, PinchStartEvent } from "./PinchEvent";
import RotateEvent, { RotateEndEvent, RotateStartEvent } from "./RotateEvent";
interface GestureProviderConfig {
    longPressDelay: number;
    doubleTapDelay: number;
    minPointers: number;
    numberOfTaps: number;
}
export default class GestureProvider {
    private static listening;
    private touchStart;
    private touchMove;
    private touchEnd;
    private touchCancel;
    private velocity;
    private dxDy;
    private scale;
    private rotation;
    private rotationDeg;
    private anchor;
    private octant;
    private isPanning;
    private isPinching;
    private isSwiping;
    private isRotating;
    private touchStartTime;
    private touchEndTime;
    private lastTouchTime;
    private taps;
    private scaleBase;
    private touchMoved;
    private touchDown;
    private shouldFire;
    private doubleTap;
    private pointers;
    private isLongPress;
    private longPressTimeout;
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
    onPointerLeave(touchEnd: TouchEvent): void;
    dispatchEvent(gestureEvent: GestureEvent): void;
    onTouchStart(touchStart: TouchEvent): void;
    onTouchMove(touchMove: TouchEvent): void;
    onTouchEnd(touchEnd: TouchEvent): void;
    onTouchCancel(touchCancel: TouchEvent): void;
}
interface GestureEventMap {
    "tap": TapEvent;
    "longpress": LongPressEvent;
    "doubletap": DoubleTapEvent;
    "swipestart": SwipeStartEvent;
    "swipe": SwipeEvent;
    "swipeend": SwipeEndEvent;
    "panstart": PanStartEvent;
    "pan": PanEvent;
    "panend": PanEndEvent;
    "pinchstart": PinchStartEvent;
    "pinch": PinchEvent;
    "pinchend": PinchEndEvent;
    "rotatestart": RotateStartEvent;
    "rotate": RotateEvent;
    "rotateend": RotateEndEvent;
}
declare global {
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface GlobalEventHandlersEventMap extends GestureEventMap {
    }
    interface EventTarget {
        addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    }
}
export { TapEvent, GestureEvent, LongPressEvent, DoubleTapEvent, SwipeStartEvent, SwipeEvent, SwipeEndEvent, PanStartEvent, PanEvent, PanEndEvent, PinchStartEvent, PinchEvent, PinchEndEvent, RotateStartEvent, RotateEvent, RotateEndEvent };
