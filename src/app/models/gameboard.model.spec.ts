import Gameboard from './gameboard.model';
import Ship from './ship';

describe('Gameboard Factory', () => {
    let gameboard: Gameboard;
    beforeEach(() => {
         gameboard = new Gameboard;
    })

    it('Creates a board array', () => {
        expect(gameboard.board.length).toEqual(10);
        expect(gameboard.board[0][0]).toEqual(0);
    }) 
    it('Can place ships at coordinates', () => {
        gameboard.placeShip(0,0,3);
        expect(gameboard.ships.length === 1).toBeTruthy();
        expect(gameboard.board[0][0]).toEqual(1);
        expect(gameboard.board[0][1]).toEqual(1);
        expect(gameboard.board[0][2]).toEqual(1);
        expect(gameboard.board[0][3]).toEqual(0);

    })


})