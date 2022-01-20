"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = exports.Vec2 = exports.assert = void 0;
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
exports.assert = assert;
class Vec2 {
    constructor(_x, _y) {
        this._x = 0;
        this._y = 0;
        const x = _x - window.innerWidth / 2;
        const y = _y - window.innerHeight / 2;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(_x) {
        this._x = _x;
    }
    set y(_y) {
        this._y = _y;
    }
    add(vector) {
        this._x += vector.x;
        this._y += vector.y;
        return this;
    }
    substract(vector) {
        this._x -= vector.x;
        this._y -= vector.y;
        return this;
    }
    dot(vector) {
        const scalar = (this._x * vector.x) + (this._y * vector.y);
        return scalar;
    }
    get magnitude() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }
}
exports.Vec2 = Vec2;
function closest(needle, haystack) {
    return haystack.reduce((a, b) => {
        let a_diff = Math.abs(a - needle);
        let b_diff = Math.abs(b - needle);
        if (a_diff === b_diff) {
            return a > b ? a : b;
        }
        else {
            return b_diff < a_diff ? b : a;
        }
    });
}
exports.closest = closest;
//# sourceMappingURL=utils.js.map