"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class PanEvent extends GestureEvent_1.default {
    constructor(touchEvent, panData) {
        super('pan', touchEvent);
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
exports.default = PanEvent;
//# sourceMappingURL=PanEvent.js.map