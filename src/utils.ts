export function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export class Vec2 {
    private _x: number = 0;
    private _y: number = 0;
    private _clientX: number = 0;
    private _clientY: number = 0;
    constructor(_x: number, _y: number) {
        //convert from top left as (0, 0) to centre as (0, 0)
        this._clientX = _x;
        this._clientY = _y;
        this._x = this.translateX(_x);
        this._y = this.translateY(_y);
    }

    private translateY(_y: number) {
        return -(_y - window.innerHeight / 2);
        
    }

    private translateX(_x: number) {
        return _x - window.innerWidth / 2;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get clientX() {
        return this._clientX;
    }

    get clientY() {
        return this._clientY;
    }

    set x(_x: number) {
        this._clientX = _x;
        this._x = this.translateX(_x);
    } 
    
    set y(_y: number) {
        this._clientY = _y;
        this._y = this.translateY(_y);
    }

    add(vector: Vec2) {
        this._x += vector.x;
        this._y += vector.y;
        this._clientX += vector.clientX;
        this._clientY += vector.clientY;
        return this;
    }

    substract(vector: Vec2) {
        this._x -= vector.x;
        this._y -= vector.y;
        this._clientX -= vector.clientX;
        this._clientY -= vector.clientY;
        return this;
    }

    dot(vector: Vec2) {
        const scalar = (this._x * vector.x) + (this._y * vector.y);
        return scalar;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    get clientMagnitude() {
        return Math.sqrt(Math.pow(this._clientX, 2) + Math.pow(this._clientY, 2));
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