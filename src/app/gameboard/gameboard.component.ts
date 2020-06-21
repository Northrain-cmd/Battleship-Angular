import { Component, OnInit, Input } from '@angular/core';
import Computer from '../models/computer.model';
import Player from '../models/player.model';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {
  @Input() player: Player | Computer;
  rows = Array(10);
  constructor() { }

  ngOnInit(): void {
  }

}
