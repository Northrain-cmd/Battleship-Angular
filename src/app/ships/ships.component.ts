import { Component, OnInit } from '@angular/core';
import { GameBoardControllerService } from '../GameBoardController.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
   initialLength: number;
   target;
  onDrag(event) {
    const handle = event.target.querySelector("i");
    if (handle.contains(this.target)) {
      event.dataTransfer.setData('text', event.target.dataset.length);
      this.initialLength = this.service.player.gameboard.ships.length;
    }  else {
      event.preventDefault() 
      }
  }
  onMouseDown(event) {
    this.target = event.target;

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
