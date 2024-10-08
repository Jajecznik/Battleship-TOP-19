import { createShipsGameboardsPlayers } from "../src/logic/starting-objects";
import { Ship } from "../src/logic/ship";
import { Gameboard } from "../src/logic/gameboard";
import { Player } from "../src/logic/player";

test('method creates proper objects', () => {
    const playerCarrierShip = new Ship(1, 5, 'Carrier');
    const playerBattleshipShip = new Ship(2, 4, 'Battleship');
    const playerDestroyerShip = new Ship(3, 3, 'Destroyer');
    const playerSubmarineShip = new Ship(4, 3, 'Submarine');
    const playerPatrolBoatShip = new Ship(5, 2, 'Patrol Boat');
    const playerShips = [playerCarrierShip, playerBattleshipShip, playerDestroyerShip, playerSubmarineShip, playerPatrolBoatShip];

    const player1Gameboard = new Gameboard();
    const player1 = new Player(player1Gameboard, true);

    const result = createShipsGameboardsPlayers();

    expect(result.playerShips).toEqual(playerShips);
    expect(result.player1).toEqual(player1);
});