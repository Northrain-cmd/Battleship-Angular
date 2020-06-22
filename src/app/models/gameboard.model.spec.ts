import Gameboard from './gameboard.model';
import Ship from './ship';

describe('Gameboard Factory', () => {
    let gameboard: Gameboard;
    beforeEach(() => {
         gameboard = new Gameboard;
    })

    it('Can place ships at coordinates', () => {
        gameboard.placeShip(0,0,3);
        expect(gameboard.ships[0].ship.length).toEqual(3);
        expect(gameboard.ships[0].position).toEqual({
            row:0,
            col:0
        })
        gameboard.placeShip(0,5,3);
        expect(gameboard.ships[1].position).toEqual({
            row:0,
            col:5
        })
    })

    it('Can receive attacks and sunk ships,', () => {
        gameboard.placeShip(0,5,3);
        gameboard.receiveAttack(0,5);
        expect(gameboard.ships[0].ship.health[0]).toEqual(0);
        expect(gameboard.ships[0].ship.health[1]).toEqual(1);
        gameboard.receiveAttack(0,6);
        expect(gameboard.ships[0].ship.health[1]).toEqual(0);
        expect(gameboard.ships[0].ship.health[2]).toEqual(1);
        expect(gameboard.ships[0].ship.isSunk()).toEqual(false);
        gameboard.receiveAttack(0,7);
        expect(gameboard.ships[0].ship.isSunk()).toEqual(true);
        gameboard.placeShip(5,7,2);
        gameboard.receiveAttack(5,7);
        expect(gameboard.ships[1].ship.health[0]).toEqual(0);
    })

    it('Registers missed attacks', () => {
        gameboard.placeShip(0,5,3);
        gameboard.receiveAttack(0,5);
        expect(gameboard.missedAttacks).toEqual([]);
        gameboard.receiveAttack(0,8);
        expect(gameboard.missedAttacks).toEqual([{
            row: 0,
            col: 8
        }]);
    })

    it('Can check if all ships are sunk', () => {
        expect(gameboard.allSunk).toEqual(false);
        gameboard.placeShip(0,5,2);
        gameboard.placeShip(1,4,3);
        gameboard.receiveAttack(0,5);
        expect(gameboard.allSunk).toEqual(false);
        gameboard.receiveAttack(0,6);
        expect(gameboard.allSunk).toEqual(false);
        gameboard.receiveAttack(1,4);
        gameboard.receiveAttack(1,5);
        expect(gameboard.allSunk).toEqual(false);
        gameboard.receiveAttack(1,6);
        expect(gameboard.allSunk).toEqual(true);
    })


})