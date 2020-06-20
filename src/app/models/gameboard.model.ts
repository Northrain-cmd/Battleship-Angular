import Ship from  './ship';

export default class Gameboard {
    placeShip(row: number, col: number, length: number) {
        this.ships.push(new Ship(length));
            for(let i = col; i < col+length; i++) {
                this.board[row][i] = 1;
            }
      
    }
    board;
    ships: Ship[] = [];
    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(0))
    }
}