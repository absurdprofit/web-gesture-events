"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GestureEventTypeEnum;
(function (GestureEventTypeEnum) {
    GestureEventTypeEnum[GestureEventTypeEnum["tap"] = 0] = "tap";
    GestureEventTypeEnum[GestureEventTypeEnum["longpress"] = 1] = "longpress";
    GestureEventTypeEnum[GestureEventTypeEnum["pinchstart"] = 2] = "pinchstart";
    GestureEventTypeEnum[GestureEventTypeEnum["pinch"] = 3] = "pinch";
    GestureEventTypeEnum[GestureEventTypeEnum["pinchend"] = 4] = "pinchend";
    GestureEventTypeEnum[GestureEventTypeEnum["rotatestart"] = 5] = "rotatestart";
    GestureEventTypeEnum[GestureEventTypeEnum["rotate"] = 6] = "rotate";
    GestureEventTypeEnum[GestureEventTypeEnum["rotateend"] = 7] = "rotateend";
    GestureEventTypeEnum[GestureEventTypeEnum["swipestart"] = 8] = "swipestart";
    GestureEventTypeEnum[GestureEventTypeEnum["swipe"] = 9] = "swipe";
    GestureEventTypeEnum[GestureEventTypeEnum["swipeend"] = 10] = "swipeend";
    GestureEventTypeEnum[GestureEventTypeEnum["panstart"] = 11] = "panstart";
    GestureEventTypeEnum[GestureEventTypeEnum["pan"] = 12] = "pan";
    GestureEventTypeEnum[GestureEventTypeEnum["panend"] = 13] = "panend";
    GestureEventTypeEnum[GestureEventTypeEnum["doubletap"] = 14] = "doubletap";
})(GestureEventTypeEnum || (GestureEventTypeEnum = {}));
class GestureEvent extends TouchEvent {
    constructor(type, touchEvent) {
        super(type, {
            touches: Array.from(touchEvent.touches),
            targetTouches: Array.from(touchEvent.targetTouches),
            changedTouches: Array.from(touchEvent.changedTouches),
            ctrlKey: touchEvent.ctrlKey,
            shiftKey: touchEvent.shiftKey,
            altKey: touchEvent.altKey,
            metaKey: touchEvent.metaKey
        });
        if (type.includes("end")) {
            this.gestureTarget = touchEvent.changedTouches[0].target;
            this.x = touchEvent.changedTouches[0].clientX;
            this.y = touchEvent.changedTouches[0].clientY;
            return;
        }
        this.gestureTarget = touchEvent.touches[0].target;
        this.x = touchEvent.touches[0].clientX;
        this.y = touchEvent.touches[0].clientY;
    }
}
exports.default = GestureEvent;
//# sourceMappingURL=GestureEvent.js.map