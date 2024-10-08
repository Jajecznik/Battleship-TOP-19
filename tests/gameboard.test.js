import { Gameboard } from '../src/logic/gameboard';
import { Ship } from '../src/logic/ship';

test('constructor initializes board and ships correctly', () => {
    const gameboard = new Gameboard();
    const expectedBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));

    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([]);
    expect(gameboard.hits).toEqual([]);
});

test('method correctly places ships on the board', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(4, 3, 'Submarine');
    const ship2 = new Ship(5, 2, 'Patrol Boat');
    let expectedBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));

    gameboard.placeShip(ship1, 'horizontal', 3, 4);
    expectedBoard[3][4] = ship1;
    expectedBoard[3][5] = ship1;
    expectedBoard[3][6] = ship1;
    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([ship1]);

    gameboard.placeShip(ship2, 'vertical', 4, 2);
    expectedBoard[4][2] = ship2;
    expectedBoard[5][2] = ship2;
    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([ship1, ship2]);

    gameboard.placeShip(ship1, 'horizontal', -1, 0);
    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([ship1, ship2]);
});

test('receiving attack works correctly', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1, 5, 'Carrier');
    gameboard.placeShip(ship, 'vertical', 0, 0);

    let expectedBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));
    expectedBoard[0][0] = ship;
    expectedBoard[1][0] = ship;
    expectedBoard[2][0] = ship;
    expectedBoard[3][0] = ship;
    expectedBoard[4][0] = ship;
    expect(gameboard.board).toEqual(expectedBoard);

    gameboard.receiveAttack(2, 0);
    expectedBoard[2][0] = "H";
    expect(gameboard.board).toEqual(expectedBoard);

    gameboard.receiveAttack(5, 5);
    expectedBoard[5][5] = "M";
    expect(gameboard.board).toEqual(expectedBoard);

    gameboard.receiveAttack(0, 0);
    expectedBoard[0][0] = "H";
    gameboard.receiveAttack(1, 0);
    expectedBoard[1][0] = "H";
    gameboard.receiveAttack(3, 0);
    expectedBoard[3][0] = "H";
    expect(gameboard.board).toEqual(expectedBoard);

    gameboard.receiveAttack(4, 0);
    expectedBoard[0][0] = "S";
    expectedBoard[1][0] = "S";
    expectedBoard[2][0] = "S";
    expectedBoard[3][0] = "S";
    expectedBoard[4][0] = "S";

    expectedBoard[0][1] = "M";
    expectedBoard[1][1] = "M";
    expectedBoard[2][1] = "M";
    expectedBoard[3][1] = "M";
    expectedBoard[4][1] = "M";
    expectedBoard[5][1] = "M";
    expectedBoard[5][0] = "M";
    expect(gameboard.board).toEqual(expectedBoard);
});

test('end game status works correctly', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(4, 3, 'Submarine');
    const ship2 = new Ship(5, 2, 'Patrol Boat');

    gameboard.placeShip(ship1, 'horizontal', 0, 0);
    gameboard.placeShip(ship2, 'vertical', 2, 1);
    expect(gameboard.checkGameOver()).toBeFalsy();

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(2, 1);
    gameboard.receiveAttack(3, 1);
    expect(gameboard.checkGameOver()).toBeTruthy();
});

test('random coords are in correct range', () => {
    const gameboard = new Gameboard();
    const coords = gameboard.findRandomMove();

    expect(coords.x).toBeGreaterThanOrEqual(0);
    expect(coords.x).toBeLessThanOrEqual(9);
    expect(coords.y).toBeGreaterThanOrEqual(0);
    expect(coords.y).toBeLessThanOrEqual(9);
});

test('checking coords works', () => {
    const gameboard = new Gameboard();
    const check1 = gameboard.isWithinBounds(0, 6);
    const check2 = gameboard.isWithinBounds(1, 10);

    expect(check1).toBeTruthy();
    expect(check2).toBeFalsy();
});

test('there are all 5 ships before game start works', () => {
    const gameboard = new Gameboard();

    const ship1 = new Ship(1, 5, 'Carrier');
    const ship2 = new Ship(2, 4, 'Battleship');
    const ship3 = new Ship(3, 3, 'Destroyer');
    const ship4 = new Ship(4, 3, 'Submarine');
    const ship5 = new Ship(5, 2, 'Patrol Boat');
    const ships = [ship1, ship2, ship3, ship4, ship5];

    gameboard.placeShipsRandom(ships);
    expect(gameboard.checkIfAllShipsExist()).toBeTruthy();
});

test('clearing board works', () => {
    const gameboard = new Gameboard();
    const expectedBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));

    const ship1 = new Ship(1, 5, 'Carrier');
    const ship2 = new Ship(2, 4, 'Battleship');
    const ship3 = new Ship(3, 3, 'Destroyer');
    const ship4 = new Ship(4, 3, 'Submarine');
    const ship5 = new Ship(5, 2, 'Patrol Boat');
    const ships = [ship1, ship2, ship3, ship4, ship5];

    gameboard.placeShipsRandom(ships);
    gameboard.clearBoard();

    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([]);
    expect(gameboard.hits).toEqual([]);
});