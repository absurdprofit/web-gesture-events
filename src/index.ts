import GestureEvent from "./GestureEvent";
import LongPressEvent from "./LongPressEvent";
import TapEvent from './TapEvent';

export default class GestureProvider {
    private touchStart: TouchEvent = new TouchEvent('touchstart');
    private touchMove: TouchEvent = new TouchEvent('touchmove');
    private touchEnd: TouchEvent = new TouchEvent('touchend');
    private touchCancel: TouchEvent = new TouchEvent('touchcancel');
    private touchStartTime: number = 0;
    private touchMoved: boolean = false;
    private touchStartListener = this.onTouchStart.bind(this);
    private touchMoveListener = this.onTouchMove.bind(this);
    private touchEndListener = this.onTouchEnd.bind(this);
    private touchCancelListener = this.onTouchCancel.bind(this);
    constructor() {
        window.addEventListener('touchstart', this.touchStartListener, true);
    }
    
    bind() {
        window.addEventListener('touchmove', this.touchMoveListener, true);
        window.addEventListener('touchend', this.touchEndListener, true);
        window.addEventListener('touchcancel', this.touchCancelListener, true);
    }

    unbind() {
        window.removeEventListener('touchmove', this.touchMoveListener);
        window.removeEventListener('touchend', this.touchEndListener);
        window.removeEventListener('touchcancel', this.touchCancelListener);
    }

    clean() {
        this.touchMoved = false;
        this.touchStartTime = 0;
    }

    onTouchStart(touchStart: TouchEvent) {
        this.touchStart = touchStart;
        this.touchStartTime = Date.now();
        this.bind();
    }

    onTouchMove(touchMove: TouchEvent) {
        this.touchMoved = true;
        this.touchMove = touchMove;
    }

    onTouchEnd(touchEnd: TouchEvent) {
        this.touchEnd = touchEnd;
        const touchDuration = Date.now() - this.touchStartTime;
        
        if (!this.touchMoved) {
            if (touchDuration < 500) {
                const tapEvent = new TapEvent(this.touchStart, touchDuration);
                if (this.touchStart.touches[0]
                    && this.touchStart.touches[0].target
                    && this.touchStart.touches[0].target.constructor.name !== "Window"
                ) {
                    this.touchStart.touches[0].target.dispatchEvent(tapEvent);
                }
                window.dispatchEvent(tapEvent);
            } else {
                const longPressEvent = new LongPressEvent(this.touchStart, touchDuration);
                if (this.touchStart.touches[0]
                    && this.touchStart.touches[0].target
                    && this.touchStart.touches[0].target.constructor.name !== "Window"
                ) {
                    this.touchStart.touches[0].target.dispatchEvent(longPressEvent);
                }
                window.dispatchEvent(longPressEvent);
            }
        }


        // cleanup
        this.clean();
        this.unbind();
    }

    onTouchCancel(touchCancel: TouchEvent) {
        this.touchCancel = touchCancel;

        // cleanup
        this.clean();
        this.unbind();
    }
}

interface GestureEventMap {
    "tap": TapEvent;
    "longpress": LongPressEvent;
}

declare global {
    interface Window {
        gestureProvider: GestureProvider;
    }
    interface WindowEventMap extends GestureEventMap {}
    interface ElementEventMap extends GestureEventMap {}
    interface HTMLElement extends GestureEventMap {}
}

window.gestureProvider = new GestureProvider();

export {TapEvent, GestureEvent, LongPressEvent};