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
      if( event.target.parentElement.childNodes.length - 1 === 0) {
        event.target.parentElement.parentElement.removeChild(event.target.parentElement)
      }
      event.target.parentElement.removeChild(event.target);
    }
  }
  onClick(event) {
    event.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('.ship-obj').forEach(ship => {
      ship.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('selected');
      }) 
    })
    
    event.target.parentElement.querySelectorAll('.cell').forEach(cell => {
      cell.classList.add('selected');
    })
    this.clickService.readyToPlace.next({
      ready: true,
      length: + event.target.parentElement.dataset.length,
      parentElement: event.target.parentElement,
    })
  }
  onRotate() {
    this._vertical = ! this._vertical;
    this.vertical.emit(this._vertical);
  }
  onRandom() {
    if(this.service.player.gameboard.ships.length !== 0) {
      this.service.player.gameboard.ships = [];
      this.service.player.invalidCoords = [];
    }
    this.service.randomPlace(this.service.player);
  }
  startGame() {
    this.service.turn = 1;
  }
  constructor(public service: GameBoardControllerService, private clickService: PlaceOnClickService) {}

  ngOnInit(): void {}
}
