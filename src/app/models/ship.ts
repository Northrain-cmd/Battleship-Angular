export default class Ship {
    private _length:number;
    private _health: number[];
    get health(): number[] {
        return this._health
    }
    get length(): number {
        return this._length;
    }
    isSunk = () :boolean => {
        return this._health.includes(1) ?  false :  true
    };
    hit = (position) => {
        this._health[position] = 0;
    }
    constructor(length)  {
        this._length = length;
        this._health = Array(length);
        this._health.fill(1);
    }
}