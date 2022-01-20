"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeEvent = exports.DoubleTapEvent = exports.LongPressEvent = exports.GestureEvent = exports.TapEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
exports.GestureEvent = GestureEvent_1.default;
const LongPressEvent_1 = __importDefault(require("./LongPressEvent"));
exports.LongPressEvent = LongPressEvent_1.default;
const TapEvent_1 = __importDefault(require("./TapEvent"));
exports.TapEvent = TapEvent_1.default;
const DoubleTapEvent_1 = __importDefault(require("./DoubleTapEvent"));
exports.DoubleTapEvent = DoubleTapEvent_1.default;
const utils_1 = require("./utils");
const SwipeEvent_1 = __importDefault(require("./SwipeEvent"));
exports.SwipeEvent = SwipeEvent_1.default;
var CartesianDirectionEnum;
(function (CartesianDirectionEnum) {
    CartesianDirectionEnum[CartesianDirectionEnum["right"] = 0] = "right";
    CartesianDirectionEnum[CartesianDirectionEnum["down"] = 1] = "down";
    CartesianDirectionEnum[CartesianDirectionEnum["left"] = 2] = "left";
    CartesianDirectionEnum[CartesianDirectionEnum["up"] = 3] = "up";
})(CartesianDirectionEnum || (CartesianDirectionEnum = {}));
class GestureProvider {
    constructor() {
        this.touchStart = new TouchEvent('touchstart');
        this.touchMove = new TouchEvent('touchmove');
        this.touchEnd = new TouchEvent('touchend');
        this.touchCancel = new TouchEvent('touchcancel');
        this.touchStartTime = 0;
        this.touchEndTime = 0;
        this.lastTouchTime = 0;
        this.touchMoved = false;
        this.touchDown = false;
        this.shouldFire = false;
        this.pointers = 0;
        this.touchStartListener = this.onTouchStart.bind(this);
        this.touchMoveListener = this.onTouchMove.bind(this);
        this.touchEndListener = this.onTouchEnd.bind(this);
        this.touchCancelListener = this.onTouchCancel.bind(this);
        this.currentTarget = window;
        this.config = {
            longPressDelay: 500,
            doubleTapDelay: 150,
            minPointers: 1,
            numberOfTaps: 1
        };
        window.addEventListener('touchstart', this.touchStartListener, true);
    }
    bind(target) {
        this.unbind(this.currentTarget);
        target.addEventListener('touchmove', this.touchMoveListener, true);
        target.addEventListener('touchend', this.touchEndListener, true);
        target.addEventListener('touchcancel', this.touchCancelListener, true);
        this.currentTarget = target;
    }
    unbind(target) {
        target.removeEventListener('touchmove', this.touchMoveListener);
        target.removeEventListener('touchend', this.touchEndListener);
        target.removeEventListener('touchcancel', this.touchCancelListener);
    }
    clean() {
        this.touchMoved = false;
        this.touchStartTime = 0;
        this.touchDown = false;
    }
    onTouchStart(touchStart) {
        this.touchStart = touchStart;
        const minPointers = parseInt(touchStart.target.getAttribute('minpointers') || '0') || this.config.minPointers;
        if (this.touchStart.touches.length < minPointers) {
            this.shouldFire = false;
            return;
        }
        this.shouldFire = true;
        this.touchStartTime = Date.now();
        this.touchDown = true;
        if (!this.pointers)
            this.bind(touchStart.touches[0].target);
        this.pointers = this.touchStart.touches.length;
        const longPressDelay = parseFloat(this.currentTarget.getAttribute('longpressdelay') || '0') || this.config.longPressDelay;
        setTimeout(() => {
            if (!this.touchMoved && this.touchDown) {
                const touchDuration = Date.now() - this.touchStartTime;
                const longPressEvent = new LongPressEvent_1.default(this.touchStart, touchDuration);
                if (this.currentTarget.constructor.name !== "Window")
                    this.currentTarget.dispatchEvent(longPressEvent);
                window.dispatchEvent(longPressEvent);
            }
        }, longPressDelay);
    }
    onTouchMove(touchMove) {
        console.log("Firing");
        if (!this.shouldFire) {
            this.unbind(touchMove.touches[0].target);
            return;
        }
        this.touchMoved = true;
        this.touchMove = touchMove;
        const origin = new utils_1.Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
        const currentPosition = new utils_1.Vec2(this.touchMove.touches[0].clientX, this.touchMove.touches[0].clientY);
        const dxDy = currentPosition.substract(origin);
        const length = dxDy.magnitude;
        const normalised = {
            x: dxDy.x / length,
            y: dxDy.y / length
        };
        const angle = Math.atan2(normalised.y, normalised.x);
        const octant = Math.round(4 * angle / (2 * Math.PI) + 4) % 4;
        const dt = (touchMove.timeStamp - this.touchStart.timeStamp) / 1000;
        const velocity = dxDy.magnitude / dt;
        const swipeEvent = new SwipeEvent_1.default(touchMove, {
            direction: CartesianDirectionEnum[octant],
            velocity: velocity
        });
        if (this.currentTarget.constructor.name !== "Window")
            this.currentTarget.dispatchEvent(swipeEvent);
        window.dispatchEvent(swipeEvent);
    }
    onTouchEnd(touchEnd) {
        if (!this.shouldFire) {
            this.unbind(this.touchEnd.touches[0].target);
            return;
        }
        this.touchEnd = touchEnd;
        this.touchEndTime = Date.now();
        const doubleTapDelay = parseFloat(this.currentTarget.getAttribute('doubletapdelay') || '0') || this.config.doubleTapDelay;
        if (!this.touchMoved) {
            if ((this.touchEndTime - this.lastTouchTime) < doubleTapDelay) {
                const doubleTapEvent = new DoubleTapEvent_1.default(this.touchStart);
                if (this.currentTarget.constructor.name !== "Window")
                    this.currentTarget.dispatchEvent(doubleTapEvent);
                window.dispatchEvent(doubleTapEvent);
                this.lastTouchTime = 0;
            }
            else {
                const tapEvent = new TapEvent_1.default(this.touchStart);
                if (this.currentTarget.constructor.name !== "Window")
                    this.currentTarget.dispatchEvent(tapEvent);
                window.dispatchEvent(tapEvent);
            }
        }
        this.pointers = this.touchEnd.touches.length;
        this.lastTouchTime = this.touchEndTime;
        this.unbind(this.currentTarget);
        this.clean();
    }
    onTouchCancel(touchCancel) {
        if (!this.shouldFire)
            return;
        this.touchCancel = touchCancel;
        this.unbind(this.currentTarget);
        this.clean();
    }
}
exports.default = GestureProvider;
window.gestureProvider = new GestureProvider();
//# sourceMappingURL=index.js.map