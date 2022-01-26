"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotateEndEvent = exports.RotateEvent = exports.RotateStartEvent = exports.PinchEndEvent = exports.PinchEvent = exports.PinchStartEvent = exports.PanEndEvent = exports.PanEvent = exports.PanStartEvent = exports.SwipeEndEvent = exports.SwipeEvent = exports.SwipeStartEvent = exports.DoubleTapEvent = exports.LongPressEvent = exports.GestureEvent = exports.TapEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
exports.GestureEvent = GestureEvent_1.default;
const LongPressEvent_1 = __importDefault(require("./LongPressEvent"));
exports.LongPressEvent = LongPressEvent_1.default;
const TapEvent_1 = __importDefault(require("./TapEvent"));
exports.TapEvent = TapEvent_1.default;
const DoubleTapEvent_1 = __importDefault(require("./DoubleTapEvent"));
exports.DoubleTapEvent = DoubleTapEvent_1.default;
const SwipeEvent_1 = __importStar(require("./SwipeEvent"));
exports.SwipeEvent = SwipeEvent_1.default;
Object.defineProperty(exports, "SwipeEndEvent", { enumerable: true, get: function () { return SwipeEvent_1.SwipeEndEvent; } });
Object.defineProperty(exports, "SwipeStartEvent", { enumerable: true, get: function () { return SwipeEvent_1.SwipeStartEvent; } });
const PanEvent_1 = __importStar(require("./PanEvent"));
exports.PanEvent = PanEvent_1.default;
Object.defineProperty(exports, "PanEndEvent", { enumerable: true, get: function () { return PanEvent_1.PanEndEvent; } });
Object.defineProperty(exports, "PanStartEvent", { enumerable: true, get: function () { return PanEvent_1.PanStartEvent; } });
const PinchEvent_1 = __importStar(require("./PinchEvent"));
exports.PinchEvent = PinchEvent_1.default;
Object.defineProperty(exports, "PinchEndEvent", { enumerable: true, get: function () { return PinchEvent_1.PinchEndEvent; } });
Object.defineProperty(exports, "PinchStartEvent", { enumerable: true, get: function () { return PinchEvent_1.PinchStartEvent; } });
const RotateEvent_1 = __importStar(require("./RotateEvent"));
exports.RotateEvent = RotateEvent_1.default;
Object.defineProperty(exports, "RotateEndEvent", { enumerable: true, get: function () { return RotateEvent_1.RotateEndEvent; } });
Object.defineProperty(exports, "RotateStartEvent", { enumerable: true, get: function () { return RotateEvent_1.RotateStartEvent; } });
const utils_1 = require("./utils");
var CartesianDirectionEnum;
(function (CartesianDirectionEnum) {
    CartesianDirectionEnum[CartesianDirectionEnum["right"] = 0] = "right";
    CartesianDirectionEnum[CartesianDirectionEnum["up"] = 1] = "up";
    CartesianDirectionEnum[CartesianDirectionEnum["left"] = 2] = "left";
    CartesianDirectionEnum[CartesianDirectionEnum["down"] = 3] = "down";
})(CartesianDirectionEnum || (CartesianDirectionEnum = {}));
class GestureProvider {
    constructor() {
        this.touchStart = new TouchEvent('touchstart');
        this.touchMove = new TouchEvent('touchmove');
        this.touchEnd = new TouchEvent('touchend');
        this.touchCancel = new TouchEvent('touchcancel');
        this.velocity = 0;
        this.dxDy = new utils_1.Vec2(0, 0);
        this.scale = 1;
        this.rotation = 0;
        this.rotationDeg = 0;
        this.anchor = new utils_1.Vec2(0, 0);
        this.octant = 0;
        this.isPanning = false;
        this.isPinching = false;
        this.isSwiping = false;
        this.isRotating = false;
        this.touchStartTime = 0;
        this.touchEndTime = 0;
        this.lastTouchTime = 0;
        this.taps = 0;
        this.scaleBase = 0;
        this.touchMoved = false;
        this.touchDown = false;
        this.shouldFire = false;
        this.doubleTap = false;
        this.pointers = 0;
        this.isLongPress = false;
        this.longPressTimeout = 0;
        this.touchStartListener = this.onTouchStart.bind(this);
        this.touchMoveListener = this.onTouchMove.bind(this);
        this.touchEndListener = this.onTouchEnd.bind(this);
        this.touchCancelListener = this.onTouchCancel.bind(this);
        this.currentTarget = window;
        this.config = {
            longPressDelay: 500,
            doubleTapDelay: 500,
            minPointers: 1,
            numberOfTaps: 1
        };
        if (!GestureProvider.listening) {
            window.addEventListener('touchstart', this.touchStartListener, true);
            GestureProvider.listening = true;
        }
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
        this.scaleBase = 0;
        if (this.longPressTimeout && !this.isLongPress) {
            clearTimeout(this.longPressTimeout);
            this.longPressTimeout = 0;
        }
        this.isLongPress = false;
    }
    onPointerLeave(touchEnd) {
        if (!touchEnd.touches.length) {
            if (this.isSwiping) {
                const swipeEndEvent = new SwipeEvent_1.SwipeEndEvent(touchEnd, {
                    velocity: this.velocity,
                    direction: CartesianDirectionEnum[(0, utils_1.closest)(this.octant, [0, 1, 2, 3])]
                });
                this.dispatchEvent(swipeEndEvent);
                this.isSwiping = false;
            }
            if (this.isPanning) {
                const panEndEvent = new PanEvent_1.PanEndEvent(touchEnd, {
                    translation: this.dxDy,
                    velocity: this.velocity
                });
                this.dispatchEvent(panEndEvent);
                this.isPanning = false;
            }
        }
        if (touchEnd.touches.length === 1) {
            this.scaleBase = 0;
            if (this.isPinching) {
                const pinchEndEvent = new PinchEvent_1.PinchEndEvent(touchEnd, {
                    scale: this.scale
                });
                this.dispatchEvent(pinchEndEvent);
                this.isPinching = false;
            }
            if (this.isRotating) {
                const rotateEndEvent = new RotateEvent_1.RotateEndEvent(touchEnd, {
                    rotation: this.rotation,
                    rotationDeg: this.rotationDeg,
                    anchor: this.anchor
                });
                this.dispatchEvent(rotateEndEvent);
                this.isRotating = false;
            }
        }
    }
    dispatchEvent(gestureEvent) {
        queueMicrotask(() => {
            if (this.currentTarget.constructor.name !== "Window")
                this.currentTarget.dispatchEvent(gestureEvent);
            window.dispatchEvent(gestureEvent);
        });
    }
    onTouchStart(touchStart) {
        if ('gesturetarget' in touchStart.touches[0].target.dataset === false)
            return;
        this.touchStart = touchStart;
        const minPointers = parseInt(touchStart.target.getAttribute('minpointers') || '0') || this.config.minPointers;
        if (this.touchStart.touches.length < minPointers) {
            this.shouldFire = false;
            return;
        }
        this.shouldFire = true;
        this.touchStartTime = touchStart.timeStamp;
        this.touchDown = true;
        if (!this.pointers)
            this.bind(touchStart.touches[0].target);
        this.pointers = this.touchStart.touches.length;
        const longPressDelay = parseFloat(this.currentTarget.getAttribute('longpressdelay') || '0') || this.config.longPressDelay;
        if (!this.longPressTimeout) {
            this.longPressTimeout = setTimeout(() => {
                if (!this.touchMoved && this.touchDown) {
                    const touchDuration = Date.now() - this.touchStartTime;
                    const longPressEvent = new LongPressEvent_1.default(this.touchStart, touchDuration);
                    this.dispatchEvent(longPressEvent);
                    this.isLongPress = true;
                    this.longPressTimeout = 0;
                }
            }, longPressDelay);
        }
        if (this.touchStart.touches.length > 1) {
            const originPointerPrimary = new utils_1.Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
            const originPointerSecondary = new utils_1.Vec2(this.touchStart.touches[1].clientX, this.touchStart.touches[1].clientY);
            this.scaleBase = originPointerPrimary.substract(originPointerSecondary).magnitude;
        }
        else
            this.scaleBase = 0;
    }
    onTouchMove(touchMove) {
        if (!this.shouldFire)
            return;
        this.touchMoved = true;
        this.touchMove = touchMove;
        if (touchMove.touches.length > 1 && this.touchStart.touches.length > 1) {
            if (touchMove.touches[1].clientX !== this.touchStart.touches[1].clientX
                || touchMove.touches[1].clientY !== this.touchStart.touches[1].clientY) {
                const currentPointerPrimary = new utils_1.Vec2(this.touchMove.touches[0].clientX, this.touchMove.touches[0].clientY);
                const currentPointerSecondary = new utils_1.Vec2(this.touchMove.touches[1].clientX, this.touchMove.touches[1].clientY);
                const originPointerPrimary = new utils_1.Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
                const distance = currentPointerPrimary.substract(currentPointerSecondary);
                if (this.scaleBase && Math.abs(this.scaleBase - distance.magnitude) > 10) {
                    const scaleFactor = distance.magnitude / this.scaleBase;
                    this.scale = scaleFactor;
                    if (this.isPinching) {
                        const pinchEvent = new PinchEvent_1.default(touchMove, {
                            scale: scaleFactor
                        });
                        this.dispatchEvent(pinchEvent);
                    }
                    else {
                        const pinchStartEvent = new PinchEvent_1.PinchStartEvent(touchMove, {
                            scale: scaleFactor
                        });
                        this.dispatchEvent(pinchStartEvent);
                        this.isPinching = true;
                    }
                }
                this.anchor = currentPointerPrimary;
                let rotationAngle = Math.atan2((originPointerPrimary.clientY - currentPointerSecondary.clientY), (originPointerPrimary.clientX - currentPointerSecondary.clientX));
                rotationAngle < 0 ? rotationAngle += 1.5708 : rotationAngle -= 1.5708;
                this.rotation = rotationAngle;
                this.rotationDeg = rotationAngle * 180 / Math.PI;
                this.anchor = this.anchor;
                if (this.isRotating) {
                    const rotateEvent = new RotateEvent_1.default(touchMove, {
                        anchor: this.anchor,
                        rotation: this.rotation,
                        rotationDeg: this.rotationDeg
                    });
                    this.dispatchEvent(rotateEvent);
                }
                else {
                    const rotateStartEvent = new RotateEvent_1.RotateStartEvent(touchMove, {
                        anchor: this.anchor,
                        rotation: this.rotation,
                        rotationDeg: this.rotationDeg
                    });
                    this.dispatchEvent(rotateStartEvent);
                    this.isRotating = true;
                }
            }
        }
        const origin = new utils_1.Vec2(this.touchStart.touches[0].clientX, this.touchStart.touches[0].clientY);
        const currentPosition = new utils_1.Vec2(this.touchMove.touches[0].clientX, this.touchMove.touches[0].clientY);
        const dxDy = currentPosition.substract(origin);
        const length = dxDy.magnitude;
        const normalised = {
            x: dxDy.x / length,
            y: dxDy.y / length
        };
        const angle = Math.atan2(normalised.y, normalised.x);
        this.octant = Math.round(4 * angle / (2 * Math.PI) + 4) % 4;
        const dt = (touchMove.timeStamp - this.touchStart.timeStamp) / 1000;
        const velocity = dxDy.magnitude / dt;
        if (this.isSwiping) {
            const swipeEvent = new SwipeEvent_1.default(touchMove, {
                direction: CartesianDirectionEnum[(0, utils_1.closest)(this.octant, [0, 1, 2, 3])],
                velocity: velocity
            });
            this.dispatchEvent(swipeEvent);
        }
        else {
            const swipeStartEvent = new SwipeEvent_1.SwipeStartEvent(touchMove, {
                direction: CartesianDirectionEnum[(0, utils_1.closest)(this.octant, [0, 1, 2, 3])],
                velocity: velocity
            });
            this.dispatchEvent(swipeStartEvent);
            this.isSwiping = true;
        }
        this.dxDy = dxDy;
        this.velocity = velocity;
        if (this.isPanning) {
            const panEvent = new PanEvent_1.default(touchMove, {
                translation: dxDy,
                velocity: velocity
            });
            this.dispatchEvent(panEvent);
        }
        else {
            const panStartEvent = new PanEvent_1.PanStartEvent(touchMove, {
                translation: dxDy,
                velocity: velocity
            });
            this.dispatchEvent(panStartEvent);
            this.isPanning = true;
        }
    }
    onTouchEnd(touchEnd) {
        const numberOfTaps = parseInt(this.currentTarget.getAttribute('numberoftaps') || '0') || this.config.numberOfTaps;
        this.taps++;
        this.shouldFire = Boolean(this.taps >= numberOfTaps);
        if (this.shouldFire) {
            this.touchEnd = touchEnd;
            this.touchEndTime = touchEnd.timeStamp;
            const doubleTapDelay = parseFloat(this.currentTarget.getAttribute('doubletapdelay') || '0') || this.config.doubleTapDelay;
            if (!this.touchMoved && !this.isLongPress) {
                if ((this.touchEndTime - this.lastTouchTime) < doubleTapDelay && !this.doubleTap) {
                    this.doubleTap = true;
                    const doubleTapEvent = new DoubleTapEvent_1.default(this.touchStart);
                    this.dispatchEvent(doubleTapEvent);
                    this.lastTouchTime = 0;
                }
                else {
                    this.doubleTap = false;
                    const tapEvent = new TapEvent_1.default(this.touchStart);
                    this.dispatchEvent(tapEvent);
                }
            }
            this.taps = 0;
        }
        this.pointers = this.touchEnd.touches.length;
        this.lastTouchTime = this.touchEndTime;
        this.onPointerLeave(touchEnd);
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
GestureProvider.listening = false;
window.gestureProvider = new GestureProvider();
//# sourceMappingURL=index.js.map