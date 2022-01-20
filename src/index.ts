import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
import {closest, Vec2} from './utils';
import SwipeEvent from "./SwipeEvent";

interface GestureProviderConfig {
    longPressDelay: number;
    doubleTapDelay: number; // maximum time in miliseconds that can pass between taps
    minPointers: number; // minimum number of pointers required before events are fired
    numberOfTaps: number; // number of tap gestures required to fire tap event
}

enum CartesianDirectionEnum {
    right = 0,
    down = 1,
    left = 2,
    up = 3,
}


export default class GestureProvider {
    private touchStart: TouchEvent = new TouchEvent('touchstart');
    private touchMove: TouchEvent = new TouchEvent('touchmove');
    private touchEnd: TouchEvent = new TouchEvent('touchend');
    private touchCancel: TouchEvent = new TouchEvent('touchcancel');
    private touchStartTime: number = 0;
    private touchEndTime: number = 0;
    private lastTouchTime: number = 0;
    private touchMoved: boolean = false;
    private touchDown: boolean = false;
    private shouldFire: boolean = false;
    private pointers: number = 0;
    private touchStartListener = this.onTouchStart.bind(this);
    private touchMoveListener = this.onTouchMove.bind(this);
    private touchEndListener = this.onTouchEnd.bind(this);
    private touchCancelListener = this.onTouchCancel.bind(this);
    private currentTarget: Window | EventTarget = window;
    public config: GestureProviderConfig = {
        longPressDelay: 500,
        doubleTapDelay: 150,
        minPointers: 1,
        numberOfTaps: 1
    }
    constructor() {
        window.addEventListener('touchstart', this.touchStartListener, true);
    }
    
    bind(target: Window | EventTarget) {
        this.unbind(this.currentTarget);
        target.addEventListener('touchmove', this.touchMoveListener, true);
        target.addEventListener('touchend', this.touchEndListener, true);
        target.addEventListener('touchcancel', this.touchCancelListener, true);
        this.currentTarget = target;
    }

    unbind(target: Window | EventTarget) {
        target.removeEventListener('touchmove', this.touchMoveListener);
        target.removeEventListener('touchend', this.touchEndListener);
        target.removeEventListener('touchcancel', this.touchCancelListener);
    }

    clean() {
        this.touchMoved = false;
        this.touchStartTime = 0;
        this.touchDown = false;
    }

    onTouchStart(touchStart: TouchEvent) {
        this.touchStart = touchStart;
        const minPointers = parseInt((touchStart.target as HTMLElement).getAttribute('minpointers') || '0') || this.config.minPointers;

        if (this.touchStart.touches.length < minPointers) {
            this.shouldFire = false;
            return
        }
        this.shouldFire = true;

        this.touchStartTime = Date.now();
        this.touchDown = true;
        if (!this.pointers) this.bind(touchStart.touches[0].target);
        this.pointers = this.touchStart.touches.length;

        const longPressDelay = parseFloat((this.currentTarget as HTMLElement).getAttribute('longpressdelay') || '0') || this.config.longPressDelay; 
        setTimeout(() => {
            if (!this.touchMoved && this.touchDown) {
                const touchDuration = Date.now() - this.touchStartTime;
                const longPressEvent = new LongPressEvent(this.touchStart, touchDuration);
                if (this.currentTarget.constructor.name !== "Window") this.currentTarget.dispatchEvent(longPressEvent);
                window.dispatchEvent(longPressEvent);
            }
        }, longPressDelay);
    }

    onTouchMove(touchMove: TouchEvent) {
        if (!this.shouldFire) return;
        this.touchMoved = true;
        this.touchMove = touchMove;

        const origin = new Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
        const currentPosition = new Vec2(this.touchMove.touches[0].clientX, this.touchMove.touches[0].clientY);
        const dxDy = currentPosition.substract(origin);

        const length = dxDy.magnitude;

        const normalised = {
            x: dxDy.x / length,
            y: dxDy.y / length
        }

        const angle = Math.atan2(normalised.y, normalised.x);
        const octant = Math.round(4 * angle / (2 * Math.PI) + 4) % 4;

        const dt = (touchMove.timeStamp - this.touchStart.timeStamp) / 1000;
        const velocity = dxDy.magnitude / dt;
        const swipeEvent = new SwipeEvent(touchMove, {
            direction: CartesianDirectionEnum[octant] as keyof typeof CartesianDirectionEnum,
            velocity: velocity
        });

        if (this.currentTarget.constructor.name !== "Window") this.currentTarget.dispatchEvent(swipeEvent);
        window.dispatchEvent(swipeEvent);
    }

    onTouchEnd(touchEnd: TouchEvent) {
        if (!this.shouldFire) return;
        this.touchEnd = touchEnd;
        this.touchEndTime = Date.now();
        const doubleTapDelay = parseFloat((this.currentTarget as HTMLElement).getAttribute('doubletapdelay') || '0') || this.config.doubleTapDelay;
        
        if (!this.touchMoved) {
            if ((this.touchEndTime - this.lastTouchTime) < doubleTapDelay) {
                const doubleTapEvent = new DoubleTapEvent(this.touchStart);
                if (this.currentTarget.constructor.name !== "Window") this.currentTarget.dispatchEvent(doubleTapEvent);
                window.dispatchEvent(doubleTapEvent);

                this.lastTouchTime = 0;
            } else {
                const tapEvent = new TapEvent(this.touchStart);
                if (this.currentTarget.constructor.name !== "Window") this.currentTarget.dispatchEvent(tapEvent);
                window.dispatchEvent(tapEvent);
            }
        }


        this.pointers = this.touchEnd.touches.length;
        this.lastTouchTime = this.touchEndTime;
        // cleanup
        this.unbind(this.currentTarget);
        this.clean();
    }

    onTouchCancel(touchCancel: TouchEvent) {
        if (!this.shouldFire) return;
        this.touchCancel = touchCancel;

        // cleanup
        this.unbind(this.currentTarget);
        this.clean();
    }
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
    interface WindowEventMap extends GestureEventMap, GestureEventProperties {}
    interface ElementEventMap extends GestureEventMap, GestureEventProperties {}
    interface HTMLElement extends GestureEventMap, GestureEventProperties {}
    interface EventTarget extends GestureEventMap {
        addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    }
}

window.gestureProvider = new GestureProvider();

export {TapEvent, GestureEvent, LongPressEvent, DoubleTapEvent, SwipeEvent};