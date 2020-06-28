import Gameboard from './gameboard.model';

export default class Player {
    name: string;
    gameboard: Gameboard;
    pastTurns = [];
    invalidCoords = [];
    takeTurn(row, col, player: Player) {
        player.gameboard.receiveAttack(row, col);
        
    }
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard;
    }
}