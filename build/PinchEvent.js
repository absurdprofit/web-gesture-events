"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinchEndEvent = exports.PinchStartEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
var PinchLifecycleStateEnum;
(function (PinchLifecycleStateEnum) {
    PinchLifecycleStateEnum[PinchLifecycleStateEnum["start"] = 0] = "start";
    PinchLifecycleStateEnum[PinchLifecycleStateEnum["end"] = 1] = "end";
})(PinchLifecycleStateEnum || (PinchLifecycleStateEnum = {}));
class PinchEventBase extends GestureEvent_1.default {
    constructor(touchEvent, pinchData, state) {
        let eventType;
        switch (state) {
            case "start":
                eventType = "pinchstart";
                break;
            case "end":
                eventType = "pinchend";
                break;
            default:
                eventType = "pinch";
        }
        super(eventType, touchEvent);
        Object.defineProperty(this, 'scale', {
            value: pinchData.scale,
            writable: false
        });
    }
}
class PinchEvent extends PinchEventBase {
    constructor(touchEvent, pinchData) {
        super(touchEvent, pinchData);
    }
}
exports.default = PinchEvent;
class PinchStartEvent extends PinchEventBase {
    constructor(touchEvent, pinchData) {
        super(touchEvent, pinchData, "start");
    }
}
exports.PinchStartEvent = PinchStartEvent;
class PinchEndEvent extends PinchEventBase {
    constructor(touchEvent, pinchData) {
        super(touchEvent, pinchData, "end");
    }
}
exports.PinchEndEvent = PinchEndEvent;
//# sourceMappingURL=PinchEvent.js.map