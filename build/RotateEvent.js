"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestureEvent_1 = __importDefault(require("./GestureEvent"));
class RotateEvent extends GestureEvent_1.default {
    constructor(touchEvent, rotationData) {
        super('rotate', touchEvent);
        this.anchor = {
            x: rotationData.anchor.x,
            y: rotationData.anchor.y,
            clientX: rotationData.anchor.clientX,
            clientY: rotationData.anchor.clientY
        };
        Object.defineProperty(this, 'rotation', {
            value: rotationData.rotation,
            writable: false
        });
        this.rotationDeg = rotationData.rotationDeg;
    }
}
exports.default = RotateEvent;
//# sourceMappingURL=RotateEvent.js.map