export declare function assert(condition: boolean, message: string): void;
export declare class Vec2 {
    private _x;
    private _y;
    private _clientX;
    private _clientY;
    constructor(_x: number, _y: number);
    private translateY;
    private translateX;
    get x(): number;
    get y(): number;
    get clientX(): number;
    get clientY(): number;
    set x(_x: number);
    set y(_y: number);
    add(vector: Vec2): this;
    substract(vector: Vec2): this;
    dot(vector: Vec2): number;
    get magnitude(): number;
    get clientMagnitude(): number;
}
export declare function closest(needle: number, haystack: number[]): number;
