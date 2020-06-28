import { Component, OnInit, Output } from '@angular/core';
import { GameBoardControllerService } from '../GameBoardController.service';
import { EventEmitter } from '@angular/core';
import { PlaceOnClickService } from '../place-on-click.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
   @Output() vertical = new EventEmitter<boolean>();
   _vertical = false;;
   initialLength: number;
   target;
  onDrag(event) {
    const handle = event.target.querySelector(".cell");
    const icon = event.target.querySelector("i");
    if (handle.contains(this.target) || icon.contains(this.target)) {
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
  onClick(event) {
    console.log( event.target.parentElement,event.target)
    event.target.parentElement.querySelectorAll('.cell').forEach(cell => {
      cell.classList.toggle('selected');
    })
    const curValue = this.clickService.readyToPlace.getValue();
    this.clickService.readyToPlace.next({
      ready: ! curValue.ready,
      length: + event.target.parentElement.dataset.length,
      parentElement: event.target.parentElement,
    })
  }
  onRotate() {
    this._vertical = ! this._vertical;
    this.vertical.emit(this._vertical);
  }
  constructor(private service: GameBoardControllerService, private clickService: PlaceOnClickService) {}

  ngOnInit(): void {}
}
