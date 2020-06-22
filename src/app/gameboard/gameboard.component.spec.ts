import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardComponent } from './gameboard.component';
import Player from '../models/player.model';
import { GameBoardControllerService } from '../GameBoardController.service';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let service: GameBoardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent ],
      providers: [ GameBoardControllerService ]
    });
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GameBoardControllerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should receive player with gameboard as input', () => {
    service.createPlayer('Kris');
    service.startGame();
    component.player = service.player;
    expect(component.player).toBeDefined();
  }) 

  it('Should give cells with ships a ship class', () => {
    service.createPlayer('Kris');
    service.startGame();
    component.player = service.player;
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelectorAll(".row");
    const cell1: HTMLElement = row[0].querySelector("[data-index='0']");
    expect(cell1.classList.contains("ship")).toBeTrue();
    const cell2: HTMLElement = row[0].querySelector("[data-index='1']");
    expect(cell2.classList.contains("ship")).toBeTrue();
    const cell4: HTMLElement = row[0].querySelector("[data-index='3']");
    expect(cell4.classList.contains("ship")).toBeFalse();
  })
});
