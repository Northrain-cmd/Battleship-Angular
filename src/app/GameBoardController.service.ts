import { Injectable } from '@angular/core';
import Player from './models/player.model';
import Computer from './models/computer.model';
import Gameboard from './models/gameboard.model';

@Injectable({
  providedIn: 'root',
})
export class GameBoardControllerService {
  player: Player;
  comp = new Computer();
  turn = 0;
  gameOver = false;
  winner = '';
  createPlayer(name) {
    this.player = new Player(name);
  }

  isMissed(row: number, col: number, pl: Player | Computer) {
    const missedAttack = pl.gameboard.missedAttacks.find((attack) => {
      return attack.row === row && attack.col === col;
    });
    return missedAttack ? true : false;
  }
  isWounded(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
      Object.assign(shipObj.position, {
        length: shipObj.ship.length,
        health: shipObj.ship.health,
      })
    );
    const ship = positions.find(
      (position) => {
        if(position.vertical === true) {
          return (
            position.col === col &&
            row < position.row + position.length &&
            row >= position.row
          )
        }  else {
          return (
            position.row === row &&
            col < position.col + position.length &&
            col >= position.col
          )
        }
      }
    );
    let notWounded = true;
    if (ship) {
      if (ship.vertical === true) {
        notWounded = !!ship.health[row - ship.row] ? true : false;
      }  else {
        notWounded = !!ship.health[col - ship.col] ? true : false;
      }
    }
    return notWounded ? false : true;
  }
  makeTurn(row: number = null, col: number = null) {
    if (this.turn === 1) {
      if (
        this.player.pastTurns.find(
          (turn) => turn.row === row && turn.col === col
        )
      ) {
        return;
      } else {
        this.player.takeTurn(row, col, this.comp);
        this.player.pastTurns.push({ row, col });
        this.gameOver = this.comp.gameboard.checkShips() ? true : false;
        if (this.gameOver === true) {
          this.winner = this.player.name;
          console.log('Game Over');
        } else {
          this.turn = 2;
          this.makeTurn();
        }
      }
    } else if (this.turn === 2) {
      this.comp.makeLegalMove(this.player);
      this.gameOver = this.player.gameboard.checkShips() ? true : false;
      if (this.gameOver === true) {
        this.turn = 0;
        this.winner = this.comp.name;
        console.log('Game Over');
      } else {
        this.turn = 1;
      }
    }
  }
  isAShip(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
      Object.assign(shipObj.position, { length: shipObj.ship.length })
    );
    const isShip = positions.find(
      (position) => {
        if(position.vertical === true) {
          return (
            position.col === col &&
            row < position.row + position.length &&
            row >= position.row
          )
        }  else {
          return (
            position.row === row &&
            col < position.col + position.length &&
            col >= position.col
          )
        }
        
      }
       
    );
    return isShip ? true : false;
  }
  isSunk(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
    Object.assign(shipObj.position, { ship: shipObj.ship })
  );
  const ship = positions.find(
    (position) => {
      if(position.vertical === true) {
        return (
          position.col === col &&
          row < position.row + position.length &&
          row >= position.row
        )
      }  else {
        return (
          position.row === row &&
          col < position.col + position.length &&
          col >= position.col
        )
      }
    }
  );
  return ship ? ship.ship.isSunk() : false;
  }
  shipsNear(row, col, length, player: Player | Computer) {
    const nearShip = player.gameboard.ships.filter(ship => {
     return  ship.position.row === row ||
      ship.position.row === row+1 ||
      ship.position.row === row-1 
    }).find(ship => {
      return ship.position.col-1 === col+length -1 ||
             ship.position.col+ship.ship.length-1 === col-1 ||
             (row+1 === ship.position.row && this.spotTaken(row+1, col-1, ship.ship.length, player)) ||
             (row-1 === ship.position.row && this.spotTaken(row-1, col-1, ship.ship.length, player))
    })
    return nearShip ? true : false 
  }
  spotTaken(row, col, length, player: Player | Computer) {
    const ships = [];
   for(let i = col; i< col+length; i++) {
    let isShip = this.isAShip(row,i, player);
    ships.push(isShip);
   }
   return ships.includes(true) ? true : false

  }
  placeRandomly(length: number, player: Player | Computer) {
    let randCol: number;
    let randRow: number;
    let randOrientation: number;
    let i = 0;
    do {
      randNumbers();
      i++;
    } while (
      ((randCol + length) > 10 ||
      randRow + length  > 10 ||
      this.spotTaken(randRow,randCol,length,player) ||
      this.shipsNear(randRow,randCol,length,player)) &&
      i < 250

    );
    player.gameboard.placeShip(randRow, randCol, length, !!randOrientation);
    function randNumbers() {
      randOrientation = Math.round(Math.random());
      randRow = Math.floor(Math.random() * 10);
      randCol = Math.floor(Math.random() * 10);
    }
  }

  randomPlace(player: Player | Computer) {
    this.placeRandomly(4, player);
    this.placeRandomly(3, player);
    this.placeRandomly(3, player);
    this.placeRandomly(2, player);
    this.placeRandomly(2, player);
    this.placeRandomly(2, player);
    this.placeRandomly(1, player);
    this.placeRandomly(1, player);
    this.placeRandomly(1, player);
    this.placeRandomly(1, player);
  }
  startGame() {
    this.randomPlace(this.comp);
    // Tests, remove later
    this.player.gameboard.placeShip(0,6,3,true);
    this.player.gameboard.placeShip(0,4,3,true);
    this.player.gameboard.placeShip(0,2,3,true)
    this.player.gameboard.placeShip(6,6,3,true);
    this.player.gameboard.placeShip(6,4,3,true);
    this.player.gameboard.placeShip(6,2,3,true)
    this.turn = 1;
  }
  reset() {
    this.comp.gameboard = new Gameboard;
    this.comp.pastTurns = [];
    this.player.pastTurns = [];
    this.player.gameboard = new Gameboard;
    this.turn = 0;
    this.gameOver = false;
    this.winner = '';
    this.randomPlace(this.comp);
  }
 
  constructor() {}
}
