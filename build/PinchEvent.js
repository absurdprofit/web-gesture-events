"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class PinchEvent extends GestureEvent_1.default {
    constructor(touchEvent, pinchData) {
        super('pinch', touchEvent);
        this.scale = pinchData.scale;
    }
}
exports.default = PinchEvent;
//# sourceMappingURL=PinchEvent.js.map