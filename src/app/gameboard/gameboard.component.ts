import { Component, OnInit, Input } from '@angular/core';
import Computer from '../models/computer.model';
import Player from '../models/player.model';
import { GameBoardControllerService } from '../GameBoardController.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {
  letters = [...Array(10)].map((_,i) => {
    return String.fromCharCode(i+97).toUpperCase();
  });
  @Input() player: Player | Computer;
  rows = Array(10);
  onClick(row: number, col: number): void {
    if(this.controller.turn === 1) {
      this.controller.makeTurn(row,col)
    }
   else return
  }
  constructor(public controller: GameBoardControllerService) { }

  ngOnInit(): void {
  }

}
