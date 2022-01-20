"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class DragEvent extends _1.GestureEvent {
    constructor(touchEvent, dragData) {
        super('drag', touchEvent);
        this.velocity = dragData.velocity;
        this.direction = dragData.direction;
    }
}
exports.default = DragEvent;
//# sourceMappingURL=DragEvent.js.map