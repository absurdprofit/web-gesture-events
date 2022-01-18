"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestureEvent = exports.TapEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
exports.GestureEvent = GestureEvent_1.default;
const TapEvent_1 = __importDefault(require("./TapEvent"));
exports.TapEvent = TapEvent_1.default;
class GestureProvider {
    constructor() {
        this.touchStart = new TouchEvent('touchstart');
        this.touchMove = new TouchEvent('touchmove');
        this.touchEnd = new TouchEvent('touchend');
        this.touchCancel = new TouchEvent('touchcancel');
        this.touchStartTime = 0;
        this.touchMoved = false;
        window.addEventListener('touchstart', this.onTouchStart, true);
    }
    onTouchStart(touchStart) {
        this.touchStart = touchStart;
        this.touchStartTime = Date.now();
    }
    onTouchMove(touchMove) {
        this.touchMoved = false;
        this.touchMove = touchMove;
    }
    onTouchEnd(touchEnd) {
        this.touchEnd = touchEnd;
        const touchDuration = Date.now() - this.touchStartTime;
        const tapEvent = new TapEvent_1.default(this.touchStart, touchDuration);
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
    onTouchCancel(touchCancel) {
        this.touchCancel = touchCancel;
    }
}
//# sourceMappingURL=index.js.map