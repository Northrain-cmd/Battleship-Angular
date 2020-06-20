import { Injectable } from '@angular/core';
import Ship from './models/ship';

@Injectable({
  providedIn: 'root'
})
export class GameBoardControllerService {
  gameBoard1: Ship[] = [];
  gameBoard2: Ship[] = [];
  constructor() { }
}
