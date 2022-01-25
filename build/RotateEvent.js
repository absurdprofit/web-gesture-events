"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class RotateEvent extends GestureEvent_1.default {
    constructor(touchEvent, rotationData) {
        super('rotate', touchEvent);
        this.anchor = rotationData.anchor;
        this.rotation = rotationData.rotation;
        this.rotationDeg = rotationData.rotationDeg;
    }
}
exports.default = RotateEvent;
//# sourceMappingURL=RotateEvent.js.map