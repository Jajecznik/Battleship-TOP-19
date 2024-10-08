import { Ship } from "../logic/ship";
import { gameOverScreen } from "./game-over-screen";

// Return the board component
const boardComponent = (player, enemy, timeout = false) => {
    const board = player.gameboard.board;
    const turn = player.turn;
    const boardXLength = board.length;
    const boardYLength = board[0].length;

    // Create the board container
    const boardElement = document.createElement('div');
    const id = turn ? "player-board" : "enemy-board";
    boardElement.setAttribute('id', id);
    boardElement.classList.add(
        'h-auto',
        'my-4',
        'p-3',
        'bg-blue-300',
        'border',
        'rounded-lg'
    );

    // Create each row in the board
    for (let i = 0; i < boardXLength; i++) {
        const boardRow = document.createElement('div');
        boardRow.classList.add(
            'flex',
            'border-y',
            'border-solid',
            'border-black'
        );

        // Add thicker border to the first and last rows
        if (i === 0) boardRow.classList.add('border-t-2');
        if (i === boardXLength - 1) boardRow.classList.add('border-b-2');

        // Create each cell in the row
        for (let j = 0; j < boardYLength; j++) {
            const boardField = document.createElement('div');
            boardField.className = "board-field";
            boardField.classList.add(
                'w-12',
                'h-12',
                'border-x',
                'border-solid',
                'border-black',
                'cursor-pointer'
            );

            // Add thicker border to the first and last cells in the row
            if (j === 0) boardField.classList.add('border-l-2');
            if (j === boardYLength - 1) boardField.classList.add('border-r-2');

            // Set data attributes for the cell
            boardField.setAttribute('data-x', i);
            boardField.setAttribute('data-y', j);

            // Determine whether to draw player or enemy board
            if (turn) {
                // Drawing PLAYER board
                drawPlayerField(boardField, board[i][j]);
            } else {
                // Drawing OPPONENT board
                drawEnemyField(boardField, board[i][j]);

                // Add click event listener to enemy board cells
                if (!timeout) {
                    boardField.addEventListener('click', () => {
                        const x = boardField.getAttribute('data-x');
                        const y = boardField.getAttribute('data-y');

                        clickingOnComputerBoardHandler(x, y, board, enemy, player);
                    });
                }
            }
            boardRow.appendChild(boardField);
        }
        boardElement.appendChild(boardRow);
    }

    return boardElement;
};

// Handling clicking on computer gameboard
const clickingOnComputerBoardHandler = (x, y, board, player, computer) => {
    const randomShipsBtn = document.getElementById('random-ships-placement-btn');
    if (randomShipsBtn) {
        randomShipsBtn.remove();
    }

    if (board[x][y] !== 'H' && board[x][y] !== 'S' && board[x][y] !== 'M') {
        player.attack(computer.gameboard, x, y);

        let gameOver = computer.gameboard.checkGameOver();
        rerenderBoards(player, computer, true, gameOver);
    }
};

// Drawing player board
const drawPlayerField = (boardField, target) => {
    if (target instanceof Ship) {
        boardField.classList.add(
            'bg-green-600'
        );
    } else if (target === "H") {
        boardField.classList.add(
            'bg-yellow-600'
        );
    } else if (target === "M") {
        boardField.classList.add(
            'bg-gray-400'
        );
    } else if (target === "S") {
        boardField.classList.add(
            'bg-red-600'
        );
    }
};

// Drawing computer board
const drawEnemyField = (boardField, target) => {
    if (target === "H") {
        boardField.classList.add(
            'bg-yellow-600'
        );
    } else if (target === "M") {
        boardField.classList.add(
            'bg-gray-400'
        );
    } else if (target === "S") {
        boardField.classList.add(
            'bg-red-600'
        );
    }
};

// Handling how to render each board
const rerenderBoards = (player1, player2, timeout, gameOver) => {
    drawBoards(player1, player2, timeout);

    // Checking if player won
    if (gameOver) {
        const content = document.getElementById('content');
        const gameOverScreenContainer = gameOverScreen('Player');
        content.appendChild(gameOverScreenContainer);
    } else {
        // Half second break between real player and computer moves
        setTimeout(() => {
            player2.computerMove(player1.gameboard);
            let isGameOver = player1.gameboard.checkGameOver();

            // Checking if computer won
            if (isGameOver) {
                const content = document.getElementById('content');
                const gameOverScreenContainer = gameOverScreen('Computer');
                content.appendChild(gameOverScreenContainer);

                drawBoards(player1, player2, true);
            } else {
                drawBoards(player1, player2);
            }
        }, 500);
    }
};

// Removing old and drawing new boards
const drawBoards = (player1, player2, timeout = false) => {
    const container = document.getElementById('boards-container');

    // Remove old board components
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create and add new board components
    const player1Board = boardComponent(player1, player2, timeout);
    const player2Board = boardComponent(player2, player1, timeout);
    container.appendChild(player1Board);
    container.appendChild(player2Board);

    return container;
};

export { drawBoards, boardComponent };
