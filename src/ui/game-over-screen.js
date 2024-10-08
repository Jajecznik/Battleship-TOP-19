import { newGamePreparing } from "./new-game-preparing";

// Return the game over screen component
const gameOverScreen = (winner) => {
    const blurContainer = createBlurContainer();
    const container = createContainer();

    const gameOverInfo = createGameOverInfo();
    container.appendChild(gameOverInfo);

    const winnerInfo = createWinnerInfo(winner);
    container.appendChild(winnerInfo);

    const playAgainButton = createPlayAgainButton();

    playAgainButton.addEventListener('click', () => {
        removeGameOverScreen();
        removeBoardsContainer();
        newGamePreparing();
    });

    container.appendChild(playAgainButton);
    blurContainer.appendChild(container);

    return blurContainer;
};

// creating container 
const createBlurContainer = () => {
    const blurContainer = document.createElement('div');
    blurContainer.setAttribute('id', 'game-over-blur-container');
    blurContainer.classList.add(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-full',
        'z-10',
        'backdrop-blur-sm'
    );

    return blurContainer;
};

// Create the game over screen container
const createContainer = () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'game-over-screen-container');
    container.classList.add(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-full',
        'bg-black',
        'bg-opacity-65',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'z-11'
    );

    return container;
};

// Create the game over info text
const createGameOverInfo = () => {
    const gameOverInfo = document.createElement('p');
    gameOverInfo.innerText = "GAME OVER!";
    gameOverInfo.classList.add(
        'text-4xl',
        'font-bold',
        'text-white',
        'mb-4',
    );

    return gameOverInfo;
};

// Create the winner info text
const createWinnerInfo = (winner) => {
    const winnerInfo = document.createElement('p');
    const winnerName = winner === 'Player' ? "You " : "Computer ";
    winnerInfo.innerText = `${winnerName} won the game!`;
    winnerInfo.classList.add(
        'text-2xl',
        'font-medium',
        'text-orange-300',
        'mb-8'
    );

    return winnerInfo;
};

// Create the play again button
const createPlayAgainButton = () => {
    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = "Play Again";
    playAgainButton.classList.add(
        'px-6',
        'py-2',
        'bg-blue-500',
        'text-white',
        'text-xl',
        'font-semibold',
        'rounded',
        'shadow-md',
        'hover:bg-blue-600',
        'transition',
        'duration-300',
        'ease-in-out'
    );

    return playAgainButton;
};

// Removing the boards container
const removeBoardsContainer = () => {
    const container = document.getElementById('boards-container');
    if (container) {
        container.remove();
    }
};

// Removing old game boards
const removeOldBoards = () => {
    const container = document.getElementById('boards-container');
    if (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
};

// Removing the game over screen
const removeGameOverScreen = () => {
    const container = document.getElementById('game-over-blur-container');
    if (container) {
        container.remove();
    }
};

export { gameOverScreen, removeOldBoards, removeGameOverScreen };
