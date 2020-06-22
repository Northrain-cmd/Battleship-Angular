import { GameBoardControllerService } from './GameBoardController.service';

describe('ShipsControllerService', () => {
  let service: GameBoardControllerService;

  beforeEach(() => {
    service = new GameBoardControllerService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should have 2 Players and their boards', () =>  {
    service.createPlayer('Kris');
    expect(service.player.name).toEqual('Kris');
    expect(service.comp.gameboard).toBeDefined();
  })

  it('Should populate boards on Game start', () => {
    service.createPlayer('Kris');
    service.startGame();
    expect(service.player.gameboard.ships[0].ship.length).toEqual(3);
    expect(service.comp.gameboard.ships[0].ship.length).toEqual(3);
  })

  it('Should check if a cell contains a ship', () => {
    service.createPlayer('Kris');
    service.startGame();
    expect(service.isAShip(0,0,service.player)).toBeTrue();
    expect(service.isAShip(0,1,service.player)).toBeTrue();
    expect(service.isAShip(0,2,service.player)).toBeTrue();
    expect(service.isAShip(0,8,service.player)).toBeFalse();
    expect(service.isAShip(0,9,service.player)).toBeFalse();
    expect(service.isAShip(1,0,service.comp)).toBeFalse();
    expect(service.isAShip(0,0,service.comp)).toBeFalse();
    expect(service.isAShip(0,1,service.comp)).toBeFalse();
    expect(service.isAShip(0,2,service.comp)).toBeFalse();
    expect(service.isAShip(0,3,service.comp)).toBeFalse();
    expect(service.isAShip(0,4,service.comp)).toBeFalse();
    expect(service.isAShip(0,5,service.comp)).toBeTrue();
  })
});
