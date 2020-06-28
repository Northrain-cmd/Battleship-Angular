import { Component, OnInit, Input, DoCheck } from '@angular/core';
import Computer from '../models/computer.model';
import Player from '../models/player.model';
import { GameBoardControllerService } from '../GameBoardController.service';
import { PlaceOnClickService } from '../place-on-click.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit, DoCheck {
  letters = [...Array(10)].map((_, i) => {
    return String.fromCharCode(i + 97).toUpperCase();
  });
  placeOnClick = this.clickService.readyToPlace.getValue();
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
    console.log(this.vertical)
    if(
        (this.vertical &&
        !this.controller.isAShip(row, col, this.player) &&
        row + length <= 10 ) ||
        (!this.vertical &&
        !this.controller.isAShip(row, col, this.player) &&
        col + length <= 10
      )
    ) {
      this.controller.player.gameboard.placeShip(
        row,
        col,
        length,
        this.vertical
      );
      this.controller.addInvalidSpots(
        row,
        col,
        length,
        this.vertical,
        this.player
      );
      if (this.controller.player.gameboard.ships.length === 10) {
        this.controller.turn = 1;
      }
    }
  }

  onClick(row: number, col: number, event): void {
    console.log(this.placeOnClick)
    if (this.controller.turn === 1 && this.player === this.controller.comp) {
      this.controller.makeTurn(row, col);
    } else if (
        this.controller.turn === 0 &&
        this.player === this.controller.player &&
        this.placeOnClick.ready === true
      ) {
        let row: number = +event.target.parentElement.dataset.index;
        let col: number = +event.target.dataset.index;
        let length: number = this.placeOnClick.length;
        if(
          (this.vertical &&
          !this.controller.isAShip(row, col, this.player) &&
          row + length <= 10 ) ||
          (!this.vertical &&
          !this.controller.isAShip(row, col, this.player) &&
          col + length <= 10
        )
      ) {
          this.controller.player.gameboard.placeShip(
            row,
            col,
            length,
            this.vertical
          );
          this.controller.addInvalidSpots(
            row,
            col,
            length,
            this.vertical,
            this.player
          );
          this.placeOnClick.parentElement.parentElement.removeChild( this.placeOnClick.parentElement);
          this.clickService.readyToPlace.next({
            length: 0,
            ready: false,
            parentElement: undefined,
          })
          if (this.controller.player.gameboard.ships.length === 10) {
            this.controller.turn = 1;
          }
    }
    } 
    else return;
  }
  constructor(
    public controller: GameBoardControllerService,
    private clickService: PlaceOnClickService
  ) {
      this.clickService.readyToPlace.subscribe((data) => {
        this.placeOnClick = data;
      });
  }

  ngOnInit(): void {}
  ngDoCheck(): void {}
}
