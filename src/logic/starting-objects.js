import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

// creating ships, gameboards and players
const createShipsGameboardsPlayers = () => {
    // creating ships for each player
    const playerCarrierShip = new Ship(1, 5, 'Carrier');
    const playerBattleshipShip = new Ship(2, 4, 'Battleship');
    const playerDestroyerShip = new Ship(3, 3, 'Destroyer');
    const playerSubmarineShip = new Ship(4, 3, 'Submarine');
    const playerPatrolBoatShip = new Ship(5, 2, 'Patrol Boat');

    const enemyCarrierShip = new Ship(1, 5, 'Carrier');
    const enemyBattleshipShip = new Ship(2, 4, 'Battleship');
    const enemyDestroyerShip = new Ship(3, 3, 'Destroyer');
    const enemySubmarineShip = new Ship(4, 3, 'Submarine');
    const enemyPatrolBoatShip = new Ship(5, 2, 'Patrol Boat');

    const playerShips = [playerCarrierShip, playerBattleshipShip, playerDestroyerShip, playerSubmarineShip, playerPatrolBoatShip];
    const enemyShips = [enemyCarrierShip, enemyBattleshipShip, enemyDestroyerShip, enemySubmarineShip, enemyPatrolBoatShip];

    // creating gameboards for each player
    const player1Gameboard = new Gameboard();
    const player2Gameboard = new Gameboard();

    player2Gameboard.placeShipsRandom(enemyShips);

    // creating players (player1 - player, player2: computer)
    const player1 = new Player(player1Gameboard, true);
    const player2 = new Player(player2Gameboard, false);

    return { playerShips, player1, player2 };
};

export { createShipsGameboardsPlayers };
