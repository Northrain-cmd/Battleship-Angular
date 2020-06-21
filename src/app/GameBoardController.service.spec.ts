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
});
