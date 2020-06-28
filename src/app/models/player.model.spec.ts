import Player from './player.model';
import Computer from './computer.model';
import { GameBoardControllerService } from '../GameBoardController.service';
import { PlaceOnClickService } from '../place-on-click.service';

describe('Player factory', () => {
    let player1: Player;
    let player2: Player;
    let service: GameBoardControllerService;
    let computer: Computer;
    beforeEach(() => {
        player1 = new Player('Kris');
        player2 = new Player('Somebody');
        computer = new Computer;
        service = new GameBoardControllerService();
    })

    it('Creates  Players', () => {
        expect(player1.name).toEqual('Kris');
        expect(player2.name).toEqual('Somebody');
    })

    it("Can attack enemy's gameboard", () => {
        player1.gameboard.placeShip(0,0,2, false);
        player1.gameboard.placeShip(2,0,2, true);
        player2.gameboard.placeShip(1,0,2, false);
        player1.takeTurn(1,0, player2);
        expect(player2.gameboard.ships[0].ship.health[0]).toEqual(0);
        player2.takeTurn(0,0, player1);
        expect(player1.gameboard.ships[0].ship.health[0]).toEqual(0);
        player1.takeTurn(0,1, player2);
        expect(player2.gameboard.ships[0].ship.health[1]).toEqual(1);
        expect(player2.gameboard.missedAttacks[0]).toEqual({
            row: 0,
            col: 1
        })
        player2.takeTurn(2,0, player1);
        expect(player1.gameboard.ships[1].ship.health[0]).toEqual(0);
        player2.takeTurn(3,0, player1);
        expect(player1.gameboard.ships[1].ship.health[1]).toEqual(0);
    })


  
})
 describe('Computer Player', () => {
     let comp: Computer;
     let player: Player;
     beforeEach(() => {
         player = new Player('Kris');
         comp = new Computer;
     })

     it('Can make random moves', () => {
         comp.makeLegalMove(player);
         expect(player.gameboard.missedAttacks.length).toEqual(1);
         comp.makeLegalMove(player);
         expect(player.gameboard.missedAttacks.length).toEqual(2);
     })
 })