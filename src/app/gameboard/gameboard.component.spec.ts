import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardComponent } from './gameboard.component';
import Player from '../models/player.model';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should receive player with gameboard as input', () => {
    const tempPlayer = new Player('Kris');
    component.player = tempPlayer;
    expect(component.player).toBeDefined();
  }) 
});
