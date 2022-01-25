import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
import SwipeEvent from "./SwipeEvent";
import PanEvent from "./PanEvent";
import PinchEvent from "./PinchEvent";
import RotateEvent from "./RotateEvent";
import {closest, Vec2} from './utils';

interface GestureProviderConfig {
    longPressDelay: number;
    doubleTapDelay: number; // maximum time in miliseconds that can pass between taps
    minPointers: number; // minimum number of pointers required before events are fired
    numberOfTaps: number; // number of tap gestures required to fire tap event
}

enum CartesianDirectionEnum {
    right = 0,
    up = 1,
    left = 2,
    down = 3
}


export default class GestureProvider {
    private static listening: boolean = false;
    private touchStart: TouchEvent = new TouchEvent('touchstart');
    private touchMove: TouchEvent = new TouchEvent('touchmove');
    private touchEnd: TouchEvent = new TouchEvent('touchend');
    private touchCancel: TouchEvent = new TouchEvent('touchcancel');
    private touchStartTime: number = 0;
    private touchEndTime: number = 0;
    private lastTouchTime: number = 0;
    private taps: number = 0;
    private scaleBase: number = 0;
    private touchMoved: boolean = false;
    private touchDown: boolean = false;
    private shouldFire: boolean = false;
    private doubleTap: boolean = false;
    private pointers: number = 0;
    private isLongPress: boolean = false;
    private touchStartListener = this.onTouchStart.bind(this);
    private touchMoveListener = this.onTouchMove.bind(this);
    private touchEndListener = this.onTouchEnd.bind(this);
    private touchCancelListener = this.onTouchCancel.bind(this);
    private currentTarget: Window | EventTarget = window;
    public config: GestureProviderConfig = {
        longPressDelay: 500,
        doubleTapDelay: 500,
        minPointers: 1,
        numberOfTaps: 1
    }
    constructor() {
        if (!GestureProvider.listening) {
            window.addEventListener('touchstart', this.touchStartListener, true);
            GestureProvider.listening = true;
        }
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
        this.isLongPress = false;
        this.scaleBase = 0;
    }

    onPointerLeave() {
        if (this.touchEnd.touches.length === 1) this.scaleBase = 0; // if only one finger present then reset pinch scale
    }

    dispatchEvent(gestureEvent: GestureEvent) {
        queueMicrotask(() => {
            if (this.currentTarget.constructor.name !== "Window") this.currentTarget.dispatchEvent(gestureEvent);
            window.dispatchEvent(gestureEvent);
        });
    }

    onTouchStart(touchStart: TouchEvent) {
        if ('gesturetarget' in (touchStart.touches[0].target as HTMLElement).dataset === false) return;
        this.touchStart = touchStart;
        const minPointers = parseInt((touchStart.target as HTMLElement).getAttribute('minpointers') || '0') || this.config.minPointers;
        if (this.touchStart.touches.length < minPointers) {
            this.shouldFire = false;
            return;
        }
        this.shouldFire = true;

        this.touchStartTime = touchStart.timeStamp;
        this.touchDown = true;
        if (!this.pointers) this.bind(touchStart.touches[0].target);
        this.pointers = this.touchStart.touches.length;

        const longPressDelay = parseFloat((this.currentTarget as HTMLElement).getAttribute('longpressdelay') || '0') || this.config.longPressDelay; 
        setTimeout(() => {
            if (!this.touchMoved && this.touchDown) {
                const touchDuration = Date.now() - this.touchStartTime;
                const longPressEvent = new LongPressEvent(this.touchStart, touchDuration);
                this.dispatchEvent(longPressEvent);

                this.isLongPress = true;
            }
        }, longPressDelay);


        if (this.touchStart.touches.length > 1) {
            const originPointerPrimary = new Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
            const originPointerSecondary = new Vec2(this.touchStart.touches[1].clientX, this.touchStart.touches[1].clientY);
            this.scaleBase = originPointerPrimary.substract(originPointerSecondary).magnitude;
        } else this.scaleBase = 0;
    }

    onTouchMove(touchMove: TouchEvent) {
        if (!this.shouldFire) return;
        this.touchMoved = true;
        this.touchMove = touchMove;

        if (touchMove.touches.length > 1 && this.touchStart.touches.length > 1) {
            if (
                touchMove.touches[1].clientX !== this.touchStart.touches[1].clientX
                || touchMove.touches[1].clientY !== this.touchStart.touches[1].clientY
            ) {
                const currentPointerPrimary = new Vec2(this.touchMove.touches[0].clientX, this.touchMove.touches[0].clientY);
                const currentPointerSecondary = new Vec2(this.touchMove.touches[1].clientX, this.touchMove.touches[1].clientY);
                
                // pinch or rotate

                const originPointerPrimary = new Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
                const distance = currentPointerPrimary.substract(currentPointerSecondary);

                if (this.scaleBase && Math.abs(this.scaleBase - distance.magnitude) > 10) {
                    const scaleFactor = distance.magnitude / this.scaleBase;
                    const pinchEvent = new PinchEvent(touchMove, {
                        scale: scaleFactor
                    });

                    this.dispatchEvent(pinchEvent);
                }

                const rotationAnchor = currentPointerPrimary;
                let rotationAngle = Math.atan2(
                    (originPointerPrimary.clientY - currentPointerSecondary.clientY),
                    (originPointerPrimary.clientX - currentPointerSecondary.clientX)
                );

                rotationAngle < 0 ? rotationAngle += 1.5708 : rotationAngle -= 1.5708;
                
                const rotateEvent = new RotateEvent(touchMove, {
                    anchor: rotationAnchor,
                    rotation: rotationAngle,
                    rotationDeg: rotationAngle * 180 / Math.PI
                });

                this.dispatchEvent(rotateEvent);
            }
        }

        
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

        // closest used for rare cases that direction is undefined; relatively inexpensive since there are only 4 values that
        // octant can be closest to
        const swipeEvent = new SwipeEvent(touchMove, {
            direction: CartesianDirectionEnum[closest(octant, [0, 1, 2, 3])] as keyof typeof CartesianDirectionEnum,
            velocity: velocity
        });
        this.dispatchEvent(swipeEvent);


        const panEvent = new PanEvent(touchMove, {
            translation: dxDy,
            velocity: velocity
        });

        this.dispatchEvent(panEvent);
    }

    onTouchEnd(touchEnd: TouchEvent) {
        const numberOfTaps = parseInt((this.currentTarget as HTMLElement).getAttribute('numberoftaps') || '0') || this.config.numberOfTaps;
        this.taps++;
        this.shouldFire = Boolean(this.taps >= numberOfTaps);

        if (this.shouldFire) {
            this.touchEnd = touchEnd;
            this.touchEndTime = touchEnd.timeStamp;
            const doubleTapDelay = parseFloat((this.currentTarget as HTMLElement).getAttribute('doubletapdelay') || '0') || this.config.doubleTapDelay;
            if (!this.touchMoved && !this.isLongPress) {
                if ((this.touchEndTime - this.lastTouchTime) < doubleTapDelay && !this.doubleTap) {
                    this.doubleTap = true;
                    const doubleTapEvent = new DoubleTapEvent(this.touchStart);
                    this.dispatchEvent(doubleTapEvent);

                    this.lastTouchTime = 0;
                } else {
                    this.doubleTap = false;
                    const tapEvent = new TapEvent(this.touchStart);
                    this.dispatchEvent(tapEvent);
                }

            }
            this.taps = 0;
        }

        this.pointers = this.touchEnd.touches.length;
        this.lastTouchTime = this.touchEndTime;
        
        if (touchEnd.touches.length) this.onPointerLeave();
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
    "pan": PanEvent;
    "pinch": PinchEvent;
    "rotate": RotateEvent;
}

declare global {
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface WindowEventMap extends GestureEventMap {}
    interface ElementEventMap extends GestureEventMap {}
    interface HTMLElement extends GestureEventMap {}
    interface EventTarget extends GestureEventMap {
        addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    }
}

window.gestureProvider = new GestureProvider();

export {
    TapEvent,
    GestureEvent,
    LongPressEvent,
    DoubleTapEvent,
    SwipeEvent,
    PanEvent,
    PinchEvent,
    RotateEvent
};