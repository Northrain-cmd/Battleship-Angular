import Player from './player.model';

export default class Computer extends Player {
  makeLegalMove(player: Player) {
    let alreadyShot;
    let randCol: number;
    let randRow: number;
    do {
      randomCoords();
      alreadyShot = this.pastTurns.find((element) => {
        return element.row === randRow && element.col === randCol;
      });
    } while (alreadyShot);
    player.gameboard.receiveAttack(randRow, randCol);
    this.pastTurns.push({ row: randRow, col: randCol });
    function randomCoords(): void {
      randCol = Math.floor(Math.random() * 10);
      randRow = Math.floor(Math.random() * 10);
    }
  }
  constructor() {
    super('Computer');
  }
}
