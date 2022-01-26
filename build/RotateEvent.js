"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotateEndEvent = exports.RotateStartEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
var RotateLifecycleStateEnum;
(function (RotateLifecycleStateEnum) {
    RotateLifecycleStateEnum[RotateLifecycleStateEnum["start"] = 0] = "start";
    RotateLifecycleStateEnum[RotateLifecycleStateEnum["end"] = 1] = "end";
})(RotateLifecycleStateEnum || (RotateLifecycleStateEnum = {}));
class RotateEventBase extends GestureEvent_1.default {
    constructor(touchEvent, rotationData, state) {
        let eventType;
        switch (state) {
            case "start":
                eventType = "rotatestart";
                break;
            case "end":
                eventType = "rotateend";
                break;
            default:
                eventType = "rotate";
        }
        super(eventType, touchEvent);
        this.anchor = {
            x: rotationData.anchor.x,
            y: rotationData.anchor.y,
            clientX: rotationData.anchor.clientX,
            clientY: rotationData.anchor.clientY
        };
        Object.defineProperty(this, 'rotation', {
            value: rotationData.rotation,
            writable: false
        });
        this.rotationDeg = rotationData.rotationDeg;
    }
}
class RotateEvent extends RotateEventBase {
    constructor(touchEvent, rotationData) {
        super(touchEvent, rotationData);
    }
}
exports.default = RotateEvent;
class RotateStartEvent extends RotateEventBase {
    constructor(touchEvent, rotationData) {
        super(touchEvent, rotationData, "start");
    }
}
exports.RotateStartEvent = RotateStartEvent;
class RotateEndEvent extends RotateEventBase {
    constructor(touchEvent, rotationData) {
        super(touchEvent, rotationData, "end");
    }
}
exports.RotateEndEvent = RotateEndEvent;
//# sourceMappingURL=RotateEvent.js.map