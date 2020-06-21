import { Injectable } from '@angular/core';
import Player from './models/player.model';
import Computer from './models/computer.model';


@Injectable({
  providedIn: 'root'
})
export class GameBoardControllerService {
  player: Player;
  comp = new Computer;
  createPlayer(name) {
    this.player = new Player(name);
   
  }
  populateBoard() {
      this.player.gameboard.placeShip(0,0,3);
      this.player.gameboard.placeShip(2,0,3);
      this.player.gameboard.placeShip(4,0,3);
      this.player.gameboard.placeShip(6,0,2);
      this.player.gameboard.placeShip(8,0,4);
      this.comp.gameboard.placeShip(0,5,3);
      this.comp.gameboard.placeShip(2,5,3);
      this.comp.gameboard.placeShip(4,5,3);
      this.comp.gameboard.placeShip(6,5,2);
      this.comp.gameboard.placeShip(8,4,4);
  } 
  startGame() {
    this.populateBoard();
  }
  constructor() { }
}
