import { Injectable } from '@angular/core';
import Player from './models/player.model';
import Computer from './models/computer.model';

@Injectable({
  providedIn: 'root',
})
export class GameBoardControllerService {
  player: Player;
  comp = new Computer();
  turn = 1;
  createPlayer(name) {
    this.player = new Player(name);
  }

  isMissed(row: number, col: number, pl: Player | Computer) {
    const missedAttack = pl.gameboard.missedAttacks.find(attack => {
     return attack.row === row && attack.col === col
    });
    console.log(pl.gameboard.missedAttacks);
    return missedAttack ? true : false
  }
  isWounded(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
      Object.assign(shipObj.position, {
        length: shipObj.ship.length,
        health: shipObj.ship.health,
      })
    );
    const ship = positions.find(
      (position) =>
        position.row === row &&
        col < position.col + position.length &&
        col >= position.col
    );
    let notWounded = true;
    if(ship) {
       notWounded = !!ship.health[col - ship.col] ? true : false;
    }
    return notWounded ? false : true;
  }
  makeTurn(row: number = null, col: number = null) {
    if (this.turn === 1) {
      if(this.player.pastTurns.find(turn => turn.row === row && turn.col === col)) {
        return
      }  else {
        this.player.takeTurn(row, col, this.comp);
        this.turn = 2;
        this.player.pastTurns.push({row, col});
        this.makeTurn();
      }
    } else {
      this.comp.makeLegalMove(this.player);
      this.turn = 1;
    }
  }
  isAShip(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
      Object.assign(shipObj.position, { length: shipObj.ship.length })
    );
    const isShip = positions.find(
      (position) =>
        position.row === row &&
        col < position.col + position.length &&
        col >= position.col
    );
    return isShip ? true : false;
  }
  populateBoard() {
    this.player.gameboard.placeShip(0, 0, 3);
    this.player.gameboard.placeShip(2, 0, 3);
    this.player.gameboard.placeShip(4, 0, 3);
    this.player.gameboard.placeShip(6, 0, 2);
    this.player.gameboard.placeShip(8, 0, 4);
    this.comp.gameboard.placeShip(0, 5, 3);
    this.comp.gameboard.placeShip(2, 5, 3);
    this.comp.gameboard.placeShip(4, 5, 3);
    this.comp.gameboard.placeShip(6, 5, 2);
    this.comp.gameboard.placeShip(8, 4, 4);
  }
  startGame() {
    this.populateBoard();
  }
  constructor() {
  
  }
}
