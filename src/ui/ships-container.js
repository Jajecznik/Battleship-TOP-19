import { boardComponent } from "./board";
import { removeOldBoards } from "./game-over-screen";

let shipOrientation = "Horizontal";

// Return container with ships
const shipsComponent = (playerShips, player1, player2) => {
    const shipsElement = createShipsElement();
    const dragAndDropText = createDragAndDropText();

    shipsElement.appendChild(dragAndDropText);

    // Ship elements
    playerShips.forEach(s => {
        const id = s.id;
        const name = s.name;
        const length = s.length;

        let ship = createShip(id);
        const shipText = createShipText(name);
        const shipLength = createShipLength(s);

        ship.appendChild(shipText);
        ship.appendChild(shipLength);

        ship.addEventListener('mousedown', (e) => {
            if (!s.isPlaced()) {
                let draggedShip = createShipModel(length, shipOrientation);
                draggedShip.style.left = `${e.clientX - 26}px`;
                draggedShip.style.top = `${e.clientY - 26}px`;

                const content = document.getElementById('content');
                content.appendChild(draggedShip);

                const onMouseMove = (e) => {
                    mouseMove(e, draggedShip);
                };

                const onMouseUp = (e) => {
                    mouseUp(e, onMouseMove, onMouseUp, draggedShip, player1, player2, s, playerShips);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });
        shipsElement.appendChild(ship);
    });

    const positionContainer = createPositionContainer();
    const positionText = createPositionText();
    const positionButton = createPositionButton();

    positionButton.addEventListener('click', () => {
        shipOrientation = orientation();
    });

    positionContainer.appendChild(positionText);
    positionContainer.appendChild(positionButton);
    shipsElement.appendChild(positionContainer);

    // random position of the ships button
    const randomPlaceShipsBtn = makeShipsRandomPositionBtn();
    randomPlaceShipsBtn.addEventListener('click', () => {
        randomShipsPosition(playerShips, player1, player2);
    });

    shipsElement.appendChild(randomPlaceShipsBtn);

    return shipsElement;
};

// creating container for ships
const createShipsElement = () => {
    const shipsElement = document.createElement('div');
    shipsElement.setAttribute('id', 'ships-component');
    shipsElement.classList.add(
        'flex',
        'flex-col',
        'space-y-4',
        'my-4',
        'p-3',
        'bg-gray-100',
        'border',
        'rounded-lg'
    );

    return shipsElement;
};

// Create instructional text
const createDragAndDropText = () => {
    const dragAndDropText = document.createElement('p');
    dragAndDropText.innerText = "Drag and drop the ships below to position them on the board";
    dragAndDropText.classList.add(
        'text-xl',
        'font-semibold',
        'tracking-wide',
        'text-gray-800',
        'mb-4'
    );

    return dragAndDropText;
};

// Create ship
const createShip = (id) => {
    let ship = document.createElement('div');
    ship.setAttribute('id', `ships-${id}`);
    ship.classList.add(
        'flex',
        'items-center',
        'space-x-4',
        'p-2',
        'bg-blue-600',
        'text-white',
        'rounded-lg',
        'shadow-md',
        'w-full',
        'justify-start',
        'cursor-pointer'
    );

    return ship;
};

// Create ship name
const createShipText = (name) => {
    let shipText = document.createElement('span');
    shipText.textContent = `${name}`;
    shipText.classList.add(
        'w-1/4',
        'text-left'
    );

    return shipText;
};

// Create graphical representation of the ship's length
const createShipLength = (s) => {
    const length = s.length;
    let shipLength = document.createElement('div');

    shipLength.classList.add(
        'h-6',
        'border',
        'border-solid',
        'border-gray-500',
        'rounded'
    );
    shipLength.style.width = `${length * 48}px`;

    if (s.isPlaced()) {
        shipLength.classList.add(
            'bg-green-600'
        );
    } else {
        shipLength.classList.add(
            'bg-white'
        );
    }

    return shipLength;
};

// Create model of the dragged ship
const createShipModel = (length, orientation) => {
    let wholeShip = document.createElement('div');

    wholeShip.classList.add(
        'fixed',
        'bg-white',
        'z-9'
    );

    if (orientation === "Horizontal") {
        wholeShip.classList.add(
            'flex'
        );
    }

    for (let i = 0; i < length; i++) {
        let shipPart = document.createElement('div');

        shipPart.classList.add(
            'w-12',
            'h-12',
            'bg-white',
            'border-solid',
            'border-black',
            'cursor-pointer'
        );

        if (orientation === "Horizontal") {
            shipPart.classList.add(
                'border-x',
                'border-y-2'
            );
            if (i === 0) {
                shipPart.classList.add(
                    'border-l-2'
                );
            } else if (i === length - 1) {
                shipPart.classList.add(
                    'border-r-2'
                );
            }
        } else if (orientation === "Vertical") {
            shipPart.classList.add(
                'border-x-2',
                'border-y'
            );
            if (i === 0) {
                shipPart.classList.add(
                    'border-t-2'
                );
            } else if (i === length - 1) {
                shipPart.classList.add(
                    'border-b-2'
                );
            }
        }

        wholeShip.appendChild(shipPart);
    }

    return wholeShip;
};

// Create position container for orientation control
const createPositionContainer = () => {
    const positionContainer = document.createElement('div');
    positionContainer.classList.add(
        'w-full',
        'flex',
        'items-center',
        'justify-center',
        'pt-4',
    );

    return positionContainer;
};

// Create position label text
const createPositionText = () => {
    const positionText = document.createElement('p');
    positionText.innerText = "Ship position";
    positionText.classList.add(
        'text-lg',
        'font-semibold',
        'px-6',
    );

    return positionText;
};

// Position button to toggle between horizontal and vertical
const createPositionButton = () => {
    const positionButton = document.createElement('button');
    positionButton.setAttribute('id', 'position-btn');
    positionButton.innerText = shipOrientation;
    positionButton.classList.add(
        'bg-orange-500',
        'text-white',
        'font-semibold',
        'tracking-wide',
        'mx-6',
        'px-6',
        'py-3',
        'rounded-lg',
        'shadow-sd',
        'hover:bg-orange-600',
        'transition',
        'duration-300',
        'ease-in-out'
    );

    return positionButton;
};

// return current orientation of the ship
const orientation = () => {
    const btn = document.getElementById('position-btn');
    if (shipOrientation === "Horizontal") {
        btn.innerText = "Vertical";
        return "Vertical";
    } else if (shipOrientation === "Vertical") {
        btn.innerText = "Horizontal";
        return "Horizontal";
    }
};

// Create button for placing ships at random positions
const makeShipsRandomPositionBtn = () => {
    const randomPlaceShipsBtn = document.createElement('button');
    randomPlaceShipsBtn.setAttribute('id', 'random-ships-placement-btn');
    randomPlaceShipsBtn.innerText = "Place Ships at Random Position";

    randomPlaceShipsBtn.classList.add(
        'bg-blue-500',
        'text-white',
        'font-semibold',
        'tracking-wide',
        'py-3',
        'px-6',
        'rounded-lg',
        'shadow-md',
        'hover:bg-blue-600',
        'hover:shadow-lg',
        'transition',
        'duration-300',
        'ease-in-out'
    );

    return randomPlaceShipsBtn;
};

// changing positions of ships by loading new game
const randomShipsPosition = (playerShips, player1, player2) => {
    const containerElement = document.getElementById('boards-container');

    removeOldBoards();
    player1.gameboard.clearBoard();
    player1.gameboard.placeShipsRandom(playerShips);
    containerElement.appendChild(boardComponent(player1, player2, true));
    containerElement.appendChild(shipsComponent(playerShips, player1, player2));
};

// rendering boards after placing the ship
const rerenderBoard = (playerShips, player1, player2) => {
    const containerElement = document.getElementById('boards-container');
    removeOldBoards();
    containerElement.appendChild(boardComponent(player1, player2, true));
    containerElement.appendChild(shipsComponent(playerShips, player1));
};

const mouseMove = (e, draggedShip) => {
    draggedShip.style.left = `${e.clientX - 26}px`;
    draggedShip.style.top = `${e.clientY - 26}px`;
};

const mouseUp = (e, onMouseMove, onMouseUp, draggedShip, player1, player2, ship, playerShips) => {
    document.removeEventListener('mousemove', onMouseMove);
    draggedShip.remove();

    const x = e.clientX;
    const y = e.clientY;

    const elementBelowCursor = document.elementFromPoint(x, y);
    const dataX = elementBelowCursor.getAttribute('data-x');
    const dataY = elementBelowCursor.getAttribute('data-y');

    if (dataX && dataY) {
        let orientation = shipOrientation.toLowerCase();
        let isShipPlaced = player1.gameboard.placeShip(ship, orientation, Number(dataX), Number(dataY));

        if (isShipPlaced) {
            rerenderBoard(playerShips, player1, player2);
        }
    }
    document.removeEventListener('mouseup', onMouseUp);
};

export { shipsComponent };
