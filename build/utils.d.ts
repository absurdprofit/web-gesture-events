export declare function assert(condition: boolean, message: string): void;
export declare class Vec2 {
    private _x;
    private _y;
    constructor(_x: number, _y: number);
    get x(): number;
    get y(): number;
    set x(_x: number);
    set y(_y: number);
    add(vector: Vec2): this;
    substract(vector: Vec2): this;
    dot(vector: Vec2): number;
    get magnitude(): number;
}
export declare function closest(needle: number, haystack: number[]): number;
