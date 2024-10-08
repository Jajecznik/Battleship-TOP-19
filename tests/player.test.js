import { Gameboard } from '../src/logic/gameboard';
import { Player } from '../src/logic/player';

test('constructor works correctly', () => {
    const gameboard = new Gameboard();
    const player = new Player(gameboard, true);
    const expectedBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));

    expect(player.gameboard.board).toEqual(expectedBoard);
    expect(player.gameboard.ships).toEqual([]);
    expect(player.gameboard.hits).toEqual([]);
});

test('attack method hits enemy board correctly', () => {
    const gameboard = new Gameboard();
    const player = new Player(gameboard, true);

    const opponentGameboard = new Gameboard();
    const opponentBoard = Array.from({ length: Gameboard.BOARD_SIZE }, () => new Array(Gameboard.BOARD_SIZE).fill(null));
    opponentBoard[0][0] = "M";

    player.attack(opponentGameboard, 0, 0);
    expect(opponentGameboard.board).toEqual(opponentBoard)
});