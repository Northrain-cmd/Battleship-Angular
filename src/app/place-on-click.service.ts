import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceOnClickService {
  readyToPlace = new BehaviorSubject({
    ready: false,
    length: 0,
    parentElement: undefined,
  });
  constructor() {
   }
}
