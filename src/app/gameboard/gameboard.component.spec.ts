import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardComponent } from './gameboard.component';
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

  it("Can take user clicks as input", () => {
    service.createPlayer('Kris');
    service.startGame();
    component.player = service.player;
    fixture.detectChanges();
    const row = fixture.debugElement.nativeElement.querySelectorAll(".row");
    const cell1: HTMLElement =  row[0].querySelector("[data-index='0']");
    cell1.click();
    fixture.detectChanges();
    expect(service.turn).toEqual(1);
    service.turn = 2;
    cell1.click();
    fixture.detectChanges();
    expect(service.turn).toEqual(2);
  })

  it("Can check if a ship is wounded", () => {
    service.createPlayer('Kris');
    service.player.gameboard.placeShip(0, 0, 3);
    service.player.gameboard.placeShip(2, 0, 3);
    service.player.gameboard.placeShip(4, 0, 3);
    service.player.gameboard.placeShip(6, 0, 2);
    service.player.gameboard.placeShip(8, 0, 4);
    service.comp.gameboard.placeShip(0, 5, 3);
    service.comp.gameboard.placeShip(2, 5, 3);
    service.comp.gameboard.placeShip(4, 5, 3);
    service.comp.gameboard.placeShip(6, 5, 2);
    service.comp.gameboard.placeShip(8, 5, 4);
    component.player = service.comp;
    service.turn = 1;
    fixture.detectChanges();
    const row = fixture.debugElement.nativeElement.querySelectorAll(".row");
    const cell1: HTMLElement =  row[0].querySelector("[data-index='5']");
    cell1.click();
    fixture.detectChanges();
    expect(cell1.classList.contains("wounded")).toBeTrue();
    const cell2: HTMLElement =  row[0].querySelector("[data-index='8']");
    expect(cell2.classList.contains("wounded")).toBeFalse();
  })

  it("Can check if a cell was already shot", () => {
    service.createPlayer('Kris');
    service.player.gameboard.placeShip(0, 0, 3);
    service.player.gameboard.placeShip(2, 0, 3);
    service.player.gameboard.placeShip(4, 0, 3);
    service.player.gameboard.placeShip(6, 0, 2);
    service.player.gameboard.placeShip(8, 0, 4);
    service.comp.gameboard.placeShip(0, 5, 3);
    service.comp.gameboard.placeShip(2, 5, 3);
    service.comp.gameboard.placeShip(4, 5, 3);
    service.comp.gameboard.placeShip(6, 5, 2);
    service.comp.gameboard.placeShip(8, 5, 4);
    component.player = service.comp;
    fixture.detectChanges();
    const row = fixture.debugElement.nativeElement.querySelectorAll(".row");
    const cell1: HTMLElement =  row[0].querySelector("[data-index='9']");
    cell1.click();
    fixture.detectChanges();
    expect(cell1.classList.contains("missed")).toBeTrue();
    const cell2: HTMLElement =  row[0].querySelector("[data-index='0']");
    cell2.click();
    fixture.detectChanges();
    expect(cell2.classList.contains("missed")).toBeTrue();
    const cell3: HTMLElement =  row[0].querySelector("[data-index='1']");
    cell3.click();
    fixture.detectChanges();
    expect(cell3.classList.contains("missed")).toBeTrue();
    const cell8: HTMLElement =  row[0].querySelector("[data-index='8']");
    cell8.click();
    fixture.detectChanges();
    expect(cell8.classList.contains("missed")).toBeTrue();
    const cell0: HTMLElement =  row[1].querySelector("[data-index='0']");
    cell0.click();
    fixture.detectChanges();
    expect(cell0.classList.contains("missed")).toBeTrue();
    const cell9: HTMLElement =  row[1].querySelector("[data-index='9']");
    expect(cell9.classList.contains("missed")).toBeFalse();
  })
});
