"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeEndEvent = exports.SwipeStartEvent = void 0;
const _1 = require(".");
var SwipeLifecycleStateEnum;
(function (SwipeLifecycleStateEnum) {
    SwipeLifecycleStateEnum[SwipeLifecycleStateEnum["start"] = 0] = "start";
    SwipeLifecycleStateEnum[SwipeLifecycleStateEnum["end"] = 1] = "end";
})(SwipeLifecycleStateEnum || (SwipeLifecycleStateEnum = {}));
class SwipeEventBase extends _1.GestureEvent {
    constructor(touchEvent, swipeData, state) {
        let eventType;
        switch (state) {
            case "start":
                eventType = "swipestart";
                break;
            case "end":
                eventType = "swipeend";
                break;
            default:
                eventType = "swipe";
        }
        super(eventType, touchEvent);
        this.velocity = swipeData.velocity;
        this.direction = swipeData.direction;
    }
}
class SwipeEvent extends SwipeEventBase {
    constructor(touchEvent, swipeData) {
        super(touchEvent, swipeData);
    }
}
exports.default = SwipeEvent;
class SwipeStartEvent extends SwipeEventBase {
    constructor(touchEvent, swipeData) {
        super(touchEvent, swipeData, "start");
    }
}
exports.SwipeStartEvent = SwipeStartEvent;
class SwipeEndEvent extends SwipeEventBase {
    constructor(touchEvent, swipeData) {
        super(touchEvent, swipeData, "end");
    }
}
exports.SwipeEndEvent = SwipeEndEvent;
//# sourceMappingURL=SwipeEvent.js.map