"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanEndEvent = exports.PanStartEvent = void 0;
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
var PanLifecycleStateEnum;
(function (PanLifecycleStateEnum) {
    PanLifecycleStateEnum[PanLifecycleStateEnum["start"] = 0] = "start";
    PanLifecycleStateEnum[PanLifecycleStateEnum["end"] = 1] = "end";
})(PanLifecycleStateEnum || (PanLifecycleStateEnum = {}));
class PanEventBase extends GestureEvent_1.default {
    constructor(touchEvent, panData, state) {
        let eventType;
        switch (state) {
            case "start":
                eventType = "panstart";
                break;
            case "end":
                eventType = "panend";
                break;
            default:
                eventType = "pan";
        }
        super(eventType, touchEvent);
        this.velocity = panData.velocity;
        this.translation = {
            x: panData.translation.x,
            y: panData.translation.y,
            magnitude: panData.translation.magnitude,
            clientX: panData.translation.clientX,
            clientY: panData.translation.clientY,
            clientMagnitude: panData.translation.clientMagnitude
        };
    }
}
class PanEvent extends PanEventBase {
    constructor(touchEvent, panData) {
        super(touchEvent, panData);
    }
}
exports.default = PanEvent;
class PanStartEvent extends PanEventBase {
    constructor(touchEvent, panData) {
        super(touchEvent, panData, "start");
    }
}
exports.PanStartEvent = PanStartEvent;
class PanEndEvent extends PanEventBase {
    constructor(touchEvent, panData) {
        super(touchEvent, panData, "end");
    }
}
exports.PanEndEvent = PanEndEvent;
//# sourceMappingURL=PanEvent.js.map