import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';
import DoubleTapEvent from './DoubleTapEvent';
import SwipeEvent, { SwipeEndEvent, SwipeStartEvent } from "./SwipeEvent";
import PanEvent, { PanEndEvent, PanStartEvent } from "./PanEvent";
import PinchEvent, { PinchEndEvent, PinchStartEvent } from "./PinchEvent";
import RotateEvent, { RotateEndEvent, RotateStartEvent } from "./RotateEvent";
import {closest, Vec2} from './utils';

interface GestureProviderConfig {
    longPressDuration: number;
    tapDelay: number; // maximum time in miliseconds that can pass between taps
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
    private velocity: number = 0;
    private dxDy: Vec2 = new Vec2(0, 0);
    private scale: number = 1;
    private rotation: number = 0;
    private rotationDeg: number = 0;
    private anchor: Vec2 = new Vec2(0, 0);
    private octant: number = 0;
    private isPanning: boolean = false;
    private isPinching: boolean = false;
    private isSwiping: boolean = false;
    private isRotating: boolean = false;
    private touchStartTime: number = 0;
    private touchEndTime: number = 0;
    private lastTouchTime: number = 0;
    private taps: number = 0;
    private scaleBase: number = 0;
    private touchMoved: boolean = false;
    private touchDown: boolean = false;
    private shouldFire: boolean = false;
    private pointers: number = 0;
    private isLongPress: boolean = false;
    private longPressTimeout: number = 0;
    private touchStartListener = this.onTouchStart.bind(this);
    private touchMoveListener = this.onTouchMove.bind(this);
    private touchEndListener = this.onTouchEnd.bind(this);
    private touchCancelListener = this.onTouchCancel.bind(this);
    private currentTarget: Window | EventTarget = window;
    public config: GestureProviderConfig = {
        longPressDuration: 500,
        tapDelay: 500,
        minPointers: 1,
        numberOfTaps: 0
    }
    constructor() {
        if (!GestureProvider.listening) {
            window.addEventListener('touchstart', this.touchStartListener, {passive: false});
            GestureProvider.listening = true;
        }
    }
    
    bind(target: Window | EventTarget) {
        this.unbind(this.currentTarget);
        target.addEventListener('touchmove', this.touchMoveListener, {passive: false});
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
        this.scaleBase = 0;
        if (this.longPressTimeout && !this.isLongPress) {
            clearTimeout(this.longPressTimeout);
            this.longPressTimeout = 0;
        }
        this.isLongPress = false;
    }

    onPointerLeave(touchEnd: TouchEvent) {
        if (!touchEnd.touches.length) {
            if (this.isSwiping) {
                const swipeEndEvent = new SwipeEndEvent(touchEnd, {
                    velocity: this.velocity,
                    direction: CartesianDirectionEnum[closest(this.octant, [0, 1, 2, 3])] as keyof typeof CartesianDirectionEnum
                });
    
                this.dispatchEvent(swipeEndEvent);
                this.isSwiping = false;
            }
            if (this.isPanning) {
                const panEndEvent = new PanEndEvent(touchEnd, {
                    translation: this.dxDy,
                    velocity: this.velocity
                });
    
                this.dispatchEvent(panEndEvent);
                this.isPanning = false;
            }
        }
        if (touchEnd.touches.length === 1) {
            this.scaleBase = 0; // if only one finger present then reset pinch scale
            
            if (this.isPinching) {
                const pinchEndEvent = new PinchEndEvent(touchEnd, {
                    scale: this.scale
                });
                this.dispatchEvent(pinchEndEvent);
                this.isPinching = false;
            }
            if (this.isRotating) {
                const rotateEndEvent = new RotateEndEvent(touchEnd, {
                    rotation: this.rotation,
                    rotationDeg: this.rotationDeg,
                    anchor: this.anchor
                });

                this.dispatchEvent(rotateEndEvent);
                this.isRotating = false;                
            }
            
        }
    }

    dispatchEvent(gestureEvent: GestureEvent) {
        queueMicrotask(() => {
            this.currentTarget.dispatchEvent(gestureEvent);
        });
    }

    onTouchStart(touchStart: TouchEvent) {
        if (this.currentTarget !== touchStart.touches[0].target) {
            this.clean();
            this.unbind(this.currentTarget);
            this.pointers = this.touchEnd.touches.length;
            this.taps = 0;
        }
        this.touchStart = touchStart;
        const minPointers = parseInt((touchStart.touches[0].target as HTMLElement).dataset.minpointers || '0') || this.config.minPointers; 
        if (this.touchStart.touches.length < minPointers) {
            this.shouldFire = false;
            return;
        }
        this.shouldFire = true;

        this.touchStartTime = touchStart.timeStamp;
        this.touchDown = true;
        if (!this.pointers) this.bind(touchStart.touches[0].target);
        this.pointers = this.touchStart.touches.length;

        const longPressDuration = parseFloat((this.currentTarget as HTMLElement).dataset.longpressduration || '0') || this.config.longPressDuration;
        if (!this.longPressTimeout) {
            this.longPressTimeout = setTimeout(() => {
                if (!this.touchMoved && this.touchDown) {
                    const touchDuration = Date.now() - this.touchStartTime;
                    const longPressEvent = new LongPressEvent(this.touchStart, touchDuration);
                    this.dispatchEvent(longPressEvent);
                    this.isLongPress = true;
                    this.longPressTimeout = 0;
                }
            }, longPressDuration);
        }


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
                    this.scale = scaleFactor;
                    if (this.isPinching) {
                        const pinchEvent = new PinchEvent(touchMove, {
                            scale: scaleFactor
                        });
    
                        this.dispatchEvent(pinchEvent);
                    } else {
                        const pinchStartEvent = new PinchStartEvent(touchMove, {
                            scale: scaleFactor
                        });
                        this.dispatchEvent(pinchStartEvent);
                        this.isPinching = true;
                    }
                }

                this.anchor = currentPointerPrimary;
                let rotationAngle = Math.atan2(
                    (originPointerPrimary.clientY - currentPointerSecondary.clientY),
                    (originPointerPrimary.clientX - currentPointerSecondary.clientX)
                );

                rotationAngle < 0 ? rotationAngle += 1.5708 : rotationAngle -= 1.5708;
                this.rotation = rotationAngle;
                this.rotationDeg = rotationAngle * 180 / Math.PI;
                this.anchor = this.anchor;
                if (this.isRotating) {
                    const rotateEvent = new RotateEvent(touchMove, {
                        anchor: this.anchor,
                        rotation: this.rotation,
                        rotationDeg: this.rotationDeg
                    });
    
                    this.dispatchEvent(rotateEvent);
                } else {
                    const rotateStartEvent = new RotateStartEvent(touchMove, {
                        anchor: this.anchor,
                        rotation: this.rotation,
                        rotationDeg: this.rotationDeg
                    });

                    this.dispatchEvent(rotateStartEvent);
                    this.isRotating = true;
                }
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
        this.octant = Math.round(4 * angle / (2 * Math.PI) + 4) % 4;
        const dt = (touchMove.timeStamp - this.touchStart.timeStamp) / 1000;
        const velocity = dxDy.magnitude / dt;

        // closest used for rare cases that direction is undefined; relatively inexpensive since there are only 4 values that
        // octant can be closest to
        if (this.isSwiping) {
            const swipeEvent = new SwipeEvent(touchMove, {
                direction: CartesianDirectionEnum[closest(this.octant, [0, 1, 2, 3])] as keyof typeof CartesianDirectionEnum,
                velocity: velocity
            });
            this.dispatchEvent(swipeEvent);
        } else {
            const swipeStartEvent = new SwipeStartEvent(touchMove, {
                direction: CartesianDirectionEnum[closest(this.octant, [0, 1, 2, 3])] as keyof typeof CartesianDirectionEnum,
                velocity: velocity
            });

            this.dispatchEvent(swipeStartEvent);
            this.isSwiping = true;
        }

        this.dxDy = dxDy;
        this.velocity = velocity;
        if (this.isPanning) {
            const panEvent = new PanEvent(touchMove, {
                translation: dxDy,
                velocity: velocity
            });
    
            this.dispatchEvent(panEvent);
        } else {
            const panStartEvent = new PanStartEvent(touchMove, {
                translation: dxDy,
                velocity: velocity
            });

            this.dispatchEvent(panStartEvent);
            this.isPanning = true;
        }
    }

    onTouchEnd(touchEnd: TouchEvent) {
        const numberOfTaps = parseInt((this.currentTarget as HTMLElement).dataset.numberoftaps || '0') || this.config.numberOfTaps;
        this.taps++;
        this.shouldFire = Boolean(this.taps > numberOfTaps);

        if (this.shouldFire) {
            this.touchEnd = touchEnd;
            this.touchEndTime = touchEnd.timeStamp;
            const maxTapDelay = parseFloat((this.currentTarget as HTMLElement).dataset.tapdelay || '0') || this.config.tapDelay;
            if (!this.touchMoved && !this.isLongPress) {
                // if not first tap then check tap delay
                if (this.taps === 1 || (this.touchEndTime - this.lastTouchTime) < maxTapDelay) {
                    if (this.taps % 2 === numberOfTaps) {
                        const doubleTapEvent = new DoubleTapEvent(touchEnd);
                        this.dispatchEvent(doubleTapEvent);
                        this.taps = 0;
                    }
                    const tapEvent = new TapEvent(touchEnd);
                    this.dispatchEvent(tapEvent);
                } else {
                    this.taps = 0;
                }
            }
        }

        this.pointers = this.touchEnd.touches.length;
        this.lastTouchTime = this.touchEndTime;
        
        this.onPointerLeave(touchEnd);
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
    // interface GlobalEventHandlers {
    //     onswipestart: ((this: GlobalEventHandlers, ev: SwipeStartEvent) => any) | null;
    //     onswipe: ((this: GlobalEventHandlers, ev: SwipeEvent) => any) | null;
    //     onswipeend: ((this: GlobalEventHandlers, ev: SwipeEndEvent) => any) | null;
    //     onpanstart: ((this: GlobalEventHandlers, ev: PanStartEvent) => any) | null;
    //     onpan: ((this: GlobalEventHandlers, ev: PanEvent) => any) | null;
    //     onpanend: ((this: GlobalEventHandlers, ev: PanEndEvent) => any) | null;
    //     onpinchstart: ((this: GlobalEventHandlers, ev: PinchStartEvent) => any) | null;
    //     onpinch: ((this: GlobalEventHandlers, ev: PinchEvent) => any) | null;
    //     onpinchend: ((this: GlobalEventHandlers, ev: PinchEndEvent) => any) | null;
    //     onrotatestart: ((this: GlobalEventHandlers, ev: RotateStartEvent) => any) | null;
    //     onrotate: ((this: GlobalEventHandlers, ev: RotateEvent) => any) | null;
    //     onrotateend: ((this: GlobalEventHandlers, ev: RotateEndEvent) => any) | null;
    // }
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface GlobalEventHandlersEventMap extends GestureEventMap {}
    interface EventTarget {
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
    SwipeStartEvent,
    SwipeEvent,
    SwipeEndEvent,
    PanStartEvent,
    PanEvent,
    PanEndEvent,
    PinchStartEvent,
    PinchEvent,
    PinchEndEvent,
    RotateStartEvent,
    RotateEvent,
    RotateEndEvent
};