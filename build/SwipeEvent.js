"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class DragEvent extends _1.GestureEvent {
    constructor(touchEvent, swipeData) {
        super('swipe', touchEvent);
        this.velocity = swipeData.velocity;
        this.direction = swipeData.direction;
    }
}
exports.default = DragEvent;
//# sourceMappingURL=SwipeEvent.js.map