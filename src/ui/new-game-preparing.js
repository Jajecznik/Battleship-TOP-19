import { boardComponent, drawBoards } from "./board";
import { removeOldBoards } from "./game-over-screen";

import { shipsComponent } from "./ships-container";
import { createShipsGameboardsPlayers } from "../logic/starting-objects";

// placing boards before starting the game
const newGamePreparing = () => {
    let playerShips = createShipsGameboardsPlayers().playerShips;
    let player1 = createShipsGameboardsPlayers().player1;
    let player2 = createShipsGameboardsPlayers().player2;

    const contentElement = document.getElementById('content');

    // creating player and enemy boards container
    const boardsContainer = createBoardsContainer();
    const player1Board = boardComponent(player1, player2, true);
    boardsContainer.appendChild(player1Board);

    // ships container
    const shipsElement = shipsComponent(playerShips, player1, player2);
    boardsContainer.appendChild(shipsElement);
    contentElement.appendChild(boardsContainer);

    // game start button
    const startGameBtn = makeStartTheNewGameBtn();
    startGameBtn.addEventListener('click', () => {
        startNewGame(player1, player2);
    });

    // clear board button
    const clearBoardBtn = makeClearBoardBtn();
    clearBoardBtn.addEventListener('click', () => {
        clearGameboard(playerShips, player1, player2);
    });

    const buttonsContainer = createButtonsContainer();
    buttonsContainer.appendChild(startGameBtn);
    buttonsContainer.appendChild(clearBoardBtn);
    contentElement.appendChild(buttonsContainer);
};

// creating player and enemy boards container
const createBoardsContainer = () => {
    const boardsContainer = document.createElement('div');
    boardsContainer.setAttribute('id', 'boards-container');
    boardsContainer.classList.add(
        'w-full',
        'flex',
        'justify-between'
    );

    return boardsContainer;
};

// creating container where are 'start game' and 'random posisiotns' buttons
const createButtonsContainer = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.setAttribute('id', 'buttons-container');
    buttonsContainer.classList.add(
        'w-full',
        'flex',
        'justify-center'
    );

    return buttonsContainer;
};

// Button for starting a new game
const makeStartTheNewGameBtn = () => {
    const startGameBtn = document.createElement('button');
    startGameBtn.setAttribute('id', 'start-game-button');
    startGameBtn.innerText = "Start Game";

    startGameBtn.classList.add(
        'bg-green-500',
        'text-white',
        'font-bold',
        'tracking-wide',
        'uppercase',
        'm-4',
        'py-3',
        'px-6',
        'rounded-lg',
        'shadow-md',
        'hover:bg-green-600',
        'hover:shadow-lg',
        'transition',
        'duration-300',
        'ease-in-out'
    );

    return startGameBtn;
};

// Button for clearing the gameboard
const makeClearBoardBtn = () => {
    const startGameBtn = document.createElement('button');
    startGameBtn.setAttribute('id', 'clear-board-button');
    startGameBtn.innerText = "Clear board";

    startGameBtn.classList.add(
        'bg-red-500',
        'text-white',
        'font-bold',
        'tracking-wide',
        'uppercase',
        'm-4',
        'py-3',
        'px-6',
        'rounded-lg',
        'shadow-md',
        'hover:bg-red-600',
        'hover:shadow-lg',
        'transition',
        'duration-300',
        'ease-in-out'
    );

    return startGameBtn;
};

// staring new game
const startNewGame = (player1, player2) => {
    if (player1.gameboard.checkIfAllShipsExist() && player2.gameboard.checkIfAllShipsExist()) {
        const buttonsContainer = document.getElementById('buttons-container');
        const shipsComponent = document.getElementById('ships-component');
        const contentElement = document.getElementById('content');

        buttonsContainer.remove();
        shipsComponent.remove();
        removeOldBoards();
        contentElement.appendChild(drawBoards(player1, player2, false));
    }
};

// clearing player gameboard
const clearGameboard = (playerShips, player1, player2) => {
    const containerElement = document.getElementById('boards-container');

    removeOldBoards();
    player1.gameboard.clearBoard();
    containerElement.appendChild(boardComponent(player1, player2, true));
    containerElement.appendChild(shipsComponent(playerShips, player1, player2));
};

export { newGamePreparing };
