"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class TapEvent extends GestureEvent_1.default {
    constructor(touchEvent) {
        super('tap', touchEvent);
        this.duration = 0;
    }
}
exports.default = TapEvent;
//# sourceMappingURL=TapEvent.js.map