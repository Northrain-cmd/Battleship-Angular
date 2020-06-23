import Ship from  './ship';

export default class Gameboard {
    placeShip(row: number, col: number, length: number) {
        this.ships.push(
            {
              ship:  new Ship(length),
              position: {
                  row,
                  col
              }
            }
                );   
    }

    checkShips() {
       const stillAlive = this.ships.find(shipObject => {
          return shipObject.ship.isSunk() === false
        })
        this.allSunk = stillAlive ? false : true
    }

    receiveAttack(row: number, col: number) {
        const shipObject = this.ships.find((element) => {
           return element.position.row === row && col < element.position.col + element.ship.length &&
           col >= element.position.col
        })
        shipObject ? shipObject.ship.hit((col - shipObject.position.col)) : this.missedAttacks.push({
            row,
            col
        }) ;
        this.checkShips();
    }
    allSunk = false;
    missedAttacks = [];
    ships = [];
    constructor() {
        
    }
}