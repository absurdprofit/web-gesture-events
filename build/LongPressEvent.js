"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class LongPressEvent extends GestureEvent_1.default {
    constructor(touchEvent, duration) {
        super('longpress', touchEvent);
        this.duration = 0;
        this.duration = duration;
    }
}
exports.default = LongPressEvent;
//# sourceMappingURL=LongPressEvent.js.map