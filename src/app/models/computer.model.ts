import Player from './player.model';

export default class Computer extends Player {
    makeLegalMove(player: Player) {
        let alreadyShot;
        let randCol: number;
        let randRow: number;
        do {
            randomCoords();
        }
        while(alreadyShot)
        player.gameboard.receiveAttack(randCol, randRow);
        function randomCoords() {
            randCol = Math.floor(Math.random()*10);
            randRow = Math.floor(Math.random()*10);
            alreadyShot = player.gameboard.missedAttacks.find(element => {
            return  element.row === randRow && element.col === randCol
            })
            console.log(randCol,randRow);
        }
    }
    constructor() {
        super('Computer')
    }
}