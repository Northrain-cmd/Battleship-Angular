import Ship from './ship';

describe('Ship Class', () => {
    let ship: Ship;
    beforeEach(() => {
        ship = new Ship(3);
    })

    it('Creates an array for health', () => {
        expect(ship.health.reduce((prev, cur) => prev+cur,0)).toEqual(3);
    })

    it('Can take damage', () => {
        ship.hit(0);
        expect(ship.health[0]).toEqual(0);
      })

    it('Can be sunk', () => {
        expect(ship.isSunk()).toEqual(false);
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toEqual(true);
    })
}) 