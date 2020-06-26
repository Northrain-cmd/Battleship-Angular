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
    expect(service.comp.gameboard.ships.length).toEqual(10);
  })

  it('Should check if a cell contains a ship', () => {
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

  it('Can end turns', () => {
    service.createPlayer('Kris');
    service.startGame();
    service.player.gameboard.placeShip(0,0,2);
    service.comp.gameboard.placeShip(0,0,2);
    service.turn = 1;
    service.makeTurn(0,0);
    expect(service.turn).toEqual(1);
  })

it('Should check if a cell contains a wounded ship', () => {
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
  service.turn = 1;
  service.makeTurn(0,5);
  expect(service.isWounded(0,0,service.comp)).toBeFalse();
  expect(service.isWounded(0,5,service.comp)).toBeTrue();
})

it('Should check if a shot was missed', () => {
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
  service.turn = 1;
  service.makeTurn(0,0);
  expect(service.isMissed(0,0,service.comp)).toBeTrue();
  expect(service.isMissed(0,1,service.comp)).toBeFalse();
  expect(service.isMissed(0,9,service.comp)).toBeFalse();
})

it("Tracks past turns", () => {
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
  service.turn = 1;
  service.makeTurn(0,0);
  expect(service.player.pastTurns[0]).toEqual({
      row: 0,
      col: 0
  })
})

it("Forbids repeating turns", () => {
  service.createPlayer('Kris');
  service.startGame();
  service.turn = 1;
  service.makeTurn(0,0);
  service.makeTurn(0,0);
  expect(service.player.pastTurns.length).toEqual(1);
})

it("Can declare Game Over", () => {
  service.createPlayer('Kris');
  service.player.gameboard.placeShip(0, 0, 3);
  service.comp.gameboard.placeShip(0, 0, 3);
  service.turn = 1;
  service.makeTurn(0,0);
  expect(service.gameOver).toBeFalse();
  service.makeTurn(0,1);
  expect(service.gameOver).toBeFalse();
  service.makeTurn(0,2);
  expect(service.gameOver).toBeTrue();
})

it("Can place ships randomly", () => {
  service.createPlayer('Kris');
  service.randomPlace(service.player);
  expect(service.player.gameboard.ships.length).toEqual(10);
})
});
