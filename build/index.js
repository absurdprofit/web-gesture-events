"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongPressEvent = exports.GestureEvent = exports.TapEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
exports.GestureEvent = GestureEvent_1.default;
const LongPressEvent_1 = __importDefault(require("./LongPressEvent"));
exports.LongPressEvent = LongPressEvent_1.default;
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
        this.touchStartListener = this.onTouchStart.bind(this);
        this.touchMoveListener = this.onTouchMove.bind(this);
        this.touchEndListener = this.onTouchEnd.bind(this);
        this.touchCancelListener = this.onTouchCancel.bind(this);
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
    onTouchStart(touchStart) {
        this.touchStart = touchStart;
        this.touchStartTime = Date.now();
        this.bind();
    }
    onTouchMove(touchMove) {
        this.touchMoved = true;
        this.touchMove = touchMove;
    }
    onTouchEnd(touchEnd) {
        this.touchEnd = touchEnd;
        const touchDuration = Date.now() - this.touchStartTime;
        if (!this.touchMoved) {
            if (touchDuration < 500) {
                const tapEvent = new TapEvent_1.default(this.touchStart, touchDuration);
                if (this.touchStart.touches[0]
                    && this.touchStart.touches[0].target
                    && this.touchStart.touches[0].target.constructor.name !== "Window") {
                    this.touchStart.touches[0].target.dispatchEvent(tapEvent);
                }
                window.dispatchEvent(tapEvent);
            }
            else {
                const longPressEvent = new LongPressEvent_1.default(this.touchStart, touchDuration);
                if (this.touchStart.touches[0]
                    && this.touchStart.touches[0].target
                    && this.touchStart.touches[0].target.constructor.name !== "Window") {
                    this.touchStart.touches[0].target.dispatchEvent(longPressEvent);
                }
                window.dispatchEvent(longPressEvent);
            }
        }
        this.clean();
        this.unbind();
    }
    onTouchCancel(touchCancel) {
        this.touchCancel = touchCancel;
        this.clean();
        this.unbind();
    }
}
exports.default = GestureProvider;
window.gestureProvider = new GestureProvider();
//# sourceMappingURL=index.js.map