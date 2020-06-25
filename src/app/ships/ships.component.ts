import { Component, OnInit } from '@angular/core';
import { GameBoardControllerService } from '../GameBoardController.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
   initialLength: number;
  onDrag(event) {
    console.log(event.target.dataset.length);
    event.dataTransfer.setData('text', event.target.dataset.length);
    this.initialLength = this.service.player.gameboard.ships.length;
  }
  onDragEnd(event) { 
    if (
      event.dataTransfer.dropEffect !== 'none' &&
      this.initialLength !== this.service.player.gameboard.ships.length
    ) {
      event.target.parentElement.removeChild(event.target);
    }
  }
  constructor(private service: GameBoardControllerService) {}

  ngOnInit(): void {}
}
