export function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export class Vec2 {
    private _x: number = 0;
    private _y: number = 0;
    constructor(_x: number, _y: number) {
        //convert from top left as (0, 0) to centre as (0, 0)
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

    set x(_x: number) {
        this._x = _x;
    } 
    
    set y(_y: number) {
        this._y = _y;
    }

    add(vector: Vec2) {
        this._x += vector.x;
        this._y += vector.y;
        
        return this;
    }

    substract(vector: Vec2) {
        this._x -= vector.x;
        this._y -= vector.y;

        return this;
    }

    dot(vector: Vec2) {
        const scalar = (this._x * vector.x) + (this._y * vector.y);
        return scalar;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

}

export function closest(needle: number, haystack: number[]) {
    return haystack.reduce((a: number, b: number) => {
        let a_diff = Math.abs(a - needle);
        let b_diff = Math.abs(b - needle);

        if (a_diff === b_diff) {
            return a > b ? a : b;
        } else {
            return b_diff < a_diff ? b : a;
        }
    });
}