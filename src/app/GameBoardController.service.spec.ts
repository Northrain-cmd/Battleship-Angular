import { GameBoardControllerService } from './GameBoardController.service';

describe('ShipsControllerService', () => {
  let service: GameBoardControllerService;

  beforeEach(() => {
    service = new GameBoardControllerService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should have arrays for GameBoards 1 and 2', () => {
    expect(service.gameBoard1).toBeDefined();
    expect(service.gameBoard2).toBeDefined();
  })

 
});
