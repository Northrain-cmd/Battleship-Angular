import { Component } from '@angular/core';
import { GameBoardControllerService } from './GameBoardController.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  vertical = false;
  title = 'Battleship';
  onReset() {
    this.vertical = false;
    this.GameController.reset();
  }
  onRotate(data) {
    this.vertical = data;
  }
  constructor(public GameController: GameBoardControllerService) {
    GameController.createPlayer('Player');
    GameController.startGame();
  }
}
