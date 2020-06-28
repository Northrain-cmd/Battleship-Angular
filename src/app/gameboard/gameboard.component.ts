import { Component, OnInit, Input, DoCheck } from '@angular/core';
import Computer from '../models/computer.model';
import Player from '../models/player.model';
import { GameBoardControllerService } from '../GameBoardController.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit, DoCheck {
  letters = [...Array(10)].map((_, i) => {
    return String.fromCharCode(i + 97).toUpperCase();
  });
  @Input() vertical: boolean;
  @Input() player: Player | Computer;
  rows = Array(10);
  onOver(event) {
    event.preventDefault();
  }
  onDrop(event) {
    event.preventDefault();
    let row: number = +event.currentTarget.dataset.index;
    let col: number = +event.target.dataset.index;
    let length: number = +event.dataTransfer.getData('text');
    if (
      ! this.controller.isAShip(row, col, this.player) &&
      col + length <= 10 &&
      row + length <= 10 &&
      ! this.player.invalidCoords.find(
        (pos) =>
          (pos.row === row && pos.col === col) ||
          (pos.row === row && pos.col === col + length-1)||
          (pos.col === col && pos.row === row + length-1) 
      )
    ) {

      this.controller.player.gameboard.placeShip(row, col, length, this.vertical);
      this.controller.addInvalidSpots(row, col, length, this.vertical, this.player)
      if( this.controller.player.gameboard.ships.length === 10) {
        this.controller.turn = 1
      }

    }
  }

  onClick(row: number, col: number): void {
    if (this.controller.turn === 1 && this.player === this.controller.comp) {
      this.controller.makeTurn(row, col);
    } else return;
  }
  constructor(public controller: GameBoardControllerService) {}

  ngOnInit(): void {}
  ngDoCheck(): void {}
}
