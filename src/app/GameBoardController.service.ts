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
  invalidCoords = [];
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
    const ship = positions.find((position) => {
      if (position.vertical === true) {
        return (
          position.col === col &&
          row < position.row + position.length &&
          row >= position.row
        );
      } else {
        return (
          position.row === row &&
          col < position.col + position.length &&
          col >= position.col
        );
      }
    });
    let notWounded = true;
    if (ship) {
      if (ship.vertical === true) {
        notWounded = !!ship.health[row - ship.row] ? true : false;
      } else {
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
          this.turn = 4;
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
        this.turn = 4;
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
    const isShip = positions.find((position) => {
      if (position.vertical === true) {
        return (
          position.col === col &&
          row < position.row + position.length &&
          row >= position.row
        );
      } else {
        return (
          position.row === row &&
          col < position.col + position.length &&
          col >= position.col
        );
      }
    });
    return isShip ? true : false;
  }
  isSunk(row: number, col: number, pl: Player | Computer) {
    const positions = pl.gameboard.ships.map((shipObj) =>
      Object.assign(shipObj.position, { ship: shipObj.ship })
    );
    const ship = positions.find((position) => {
      if (position.vertical === true) {
        return (
          position.col === col &&
          row < position.row + position.length &&
          row >= position.row
        );
      } else {
        return (
          position.row === row &&
          col < position.col + position.length &&
          col >= position.col
        );
      }
    });
    return ship ? ship.ship.isSunk() : false;
  }
  addInvalidSpots(row: number, col: number, length: number, vertical: boolean, player: Player | Computer) {
    if (vertical === true) {
      player.invalidCoords.push({
        row: row + length,
        col: col,
      });
     player.invalidCoords.push({
        row: row - 1,
        col: col,
      });
      player.invalidCoords.push({
        row: row - 1,
        col: col - 1,
      });
     player.invalidCoords.push({
        row: row - 1,
        col: col + 1,
      });
      player.invalidCoords.push({
        row: row + length,
        col: col - 1,
      });
     player.invalidCoords.push({
        row: row + length,
        col: col + 1,
      });
      for (let i = row; i < row + length; i++) {
       player.invalidCoords.push({
          row: i,
          col: col,
        });
      }
      for (let i = row; i < row + length; i++) {
       player.invalidCoords.push({
          row: i,
          col: col - 1,
        });
      }
      for (let i = row; i < row + length; i++) {
       player.invalidCoords.push({
          row: i,
          col: col + 1,
        });
      }
    } else {
      player.invalidCoords.push({
        row: row,
        col: col + length,
      });
      player.invalidCoords.push({
        row: row+1,
        col: col + length,
      });
      player.invalidCoords.push({
        row: row,
        col: col - 1,
      });
     player.invalidCoords.push({
        row: row - 1,
        col: col - 1,
      });
     player.invalidCoords.push({
        row: row + 1,
        col: col - 1,
      });
      player.invalidCoords.push({
        row: row - 1,
        col: col + length,
      });
     player.invalidCoords.push({
        row: row + 1,
        col: col + length,
      });
      for (let i = col; i < col + length; i++) {
       player.invalidCoords.push({
          row: row,
          col: i,
        });
      }
      for (let i = col; i < col + length; i++) {
        player.invalidCoords.push({
          row: row - 1,
          col: i,
        });
      }
      for (let i = col; i < col + length; i++) {
        player.invalidCoords.push({
          row: row + 1,
          col: i,
        });
      }
    }

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
      randCol + length > 10 ||
      randRow + length > 10 ||
      player.invalidCoords.find(
        (pos) =>
          (pos.row === randRow && pos.col === randCol) ||
          (pos.row === randRow && pos.col === randCol + length-1)||
          (pos.col === randCol && pos.row === randRow + length-1) 
      ) !== undefined ||
      i <= 250
    );
    player.gameboard.placeShip(randRow, randCol, length, !!randOrientation);
    let ship = player.gameboard.ships[player.gameboard.ships.length - 1];
    this.addInvalidSpots(randRow, randCol, length, ship.position.vertical, player);
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
    console.log(this.comp.gameboard.ships);
  }
  startGame() {
    this.randomPlace(this.comp);
  }
  reset() {
    this.comp.gameboard = new Gameboard();
    this.comp.pastTurns = [];
    this.player.pastTurns = [];
    this.player.gameboard = new Gameboard();
    this.turn = 0;
    this.gameOver = false;
    this.winner = '';
    this.comp.invalidCoords = [];
    this.player.invalidCoords = [];
    this.randomPlace(this.comp);
    
  }

  constructor() {

  }
}
