import GestureEvent from "./GestureEvent";
import TapEvent from './TapEvent';

class GestureProvider {
    private touchStart: TouchEvent = new TouchEvent('touchstart');
    private touchMove: TouchEvent = new TouchEvent('touchmove');
    private touchEnd: TouchEvent = new TouchEvent('touchend');
    private touchCancel: TouchEvent = new TouchEvent('touchcancel');
    private touchStartTime: number = 0;
    private touchMoved: boolean = false;
    constructor() {
        window.addEventListener('touchstart', this.onTouchStart, true);
    }
    
    onTouchStart(touchStart: TouchEvent) {
        this.touchStart = touchStart;
        this.touchStartTime = Date.now();
        
    }

    onTouchMove(touchMove: TouchEvent) {
        this.touchMoved = false;
        this.touchMove = touchMove;
    }

    onTouchEnd(touchEnd: TouchEvent) {
        this.touchEnd = touchEnd;
        const touchDuration = Date.now() - this.touchStartTime;
        const tapEvent = new TapEvent(this.touchStart, touchDuration);
        
        if (!this.touchMoved) {
            if (this.touchStart.target && this.touchStart.target !== window) {
                this.touchStart.target.dispatchEvent(tapEvent);
            }
            window.dispatchEvent(tapEvent);
            
            return;
        }

        this.touchMoved = false;
        this.touchStartTime = 0;
    }

    onTouchCancel(touchCancel: TouchEvent) {
        this.touchCancel = touchCancel;
    }
}

export {TapEvent, GestureEvent};