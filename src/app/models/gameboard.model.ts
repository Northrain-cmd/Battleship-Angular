import Ship from './ship';

export default class Gameboard {
  placeShip(row: number, col: number, length: number, vertical = false) {
    this.ships.push({
      ship: new Ship(length),
      position: {
        row,
        col,
        vertical,
      },
    });
  }

  checkShips(): boolean {
    const stillAlive = this.ships.find((shipObject) => {
      return shipObject.ship.isSunk() === false;
    });
    this.allSunk = stillAlive ? false : true;
    return this.allSunk;
  }

  receiveAttack(row: number, col: number) {
    const shipObject = this.ships.find((element) => {
      if (element.position.vertical === false) {
        return (
          element.position.row === row &&
          col < element.position.col + element.ship.length &&
          col >= element.position.col
        );
      } else {
        return (
          element.position.col === col &&
          row < element.position.row + element.ship.length &&
          row >= element.position.row
        );
      }
    });
    if (shipObject) {
      shipObject.position.vertical === false
        ? shipObject.ship.hit(col - shipObject.position.col)
        : shipObject.ship.hit(row - shipObject.position.row);
    } else {
      this.missedAttacks.push({
        row,
        col,
      });
    }
    this.checkShips();
  }
  allSunk = false;
  missedAttacks = [];
  ships = [];
  constructor() {}
}
