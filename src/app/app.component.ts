import { Component } from '@angular/core';
import { GameBoardControllerService } from './GameBoardController.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Battleship';
  constructor(public GameController: GameBoardControllerService) {
    GameController.createPlayer('Kris');
    GameController.startGame();
  }
}
