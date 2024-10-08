import { Ship } from "./ship";

class Gameboard {
    static BOARD_SIZE = 10;

    constructor() {
        this.board = Array.from({ length: Gameboard.BOARD_SIZE },
            () => new Array(Gameboard.BOARD_SIZE).fill(null));
        this.ships = [];
        this.hits = [];
    }

    // clearing board
    clearBoard() {
        this.ships.forEach(ship => {
            ship.hitPositions = [];
            ship.hitCounter = 0;
            ship.placed = false;
            ship.sunk = false;
        });

        this.board = Array.from({ length: Gameboard.BOARD_SIZE },
            () => new Array(Gameboard.BOARD_SIZE).fill(null));
        this.ships = [];
        this.hits = [];
    }

    // checking if board contains all 5 ships
    checkIfAllShipsExist() {
        const expectedShips = new Set([1, 2, 3, 4, 5]);
        const foundShips = new Set();

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                const cell = this.board[row][col];

                // Check if the cell contains an instance of a Ship
                if (cell instanceof Ship) {
                    foundShips.add(cell.id);  // Assuming 'id' identifies each ship
                }
            }
        }

        return expectedShips.size === foundShips.size &&
            [...expectedShips].every(ship => foundShips.has(ship));
    }

    // finding random move
    findRandomMove() {
        let x, y;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.board[x][y] === "H" ||
        this.board[x][y] === "M" || this.board[x][y] === "S");

        return { x, y };
    }

    // checking if a position is within bounds
    isWithinBounds(x, y) {
        return x >= 0 && x < Gameboard.BOARD_SIZE && y >= 0 && y < Gameboard.BOARD_SIZE;
    }

    // checking if a surrounding area is clear
    #isSurroundingAreaClear(x, y, length, orientation) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 0], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let i = 0; i < length; i++) {
            for (const [dx, dy] of directions) {
                const newX = orientation === 'horizontal' ? x + dx : x + i + dx;
                const newY = orientation === 'horizontal' ? y + i + dy : y + dy;

                if (this.isWithinBounds(newX, newY) && this.board[newX][newY] !== null) {
                    return false;
                }
            }
        }

        return true;
    }

    // marking fields around sunk ship as hitted
    #markSurroundingFieldsAfterSink(positions) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        positions.forEach(position => {
            for (let [dx, dy] of directions) {
                let x = Number(position.x) + dx;
                let y = Number(position.y) + dy;

                if (this.isWithinBounds(x, y)) {
                    if (this.board[x][y] !== "H" && this.board[x][y] !== "M" && this.board[x][y] !== "S") {
                        this.board[x][y] = "M";
                    }
                }
            }
        });
    }

    // placing a ship on the board at specific coordinates
    placeShip(ship, orientation, x, y) {
        if (orientation === 'horizontal') {
            if (y < 0 || y + ship.length > Gameboard.BOARD_SIZE || x < 0 || x >= Gameboard.BOARD_SIZE) return;
            if (!this.#isSurroundingAreaClear(x, y, ship.length, orientation)) return false;

            for (let i = 0; i < ship.length; i++) {
                this.board[x][y + i] = ship;
            }
        } else if (orientation === 'vertical') {
            if (x < 0 || x + ship.length > Gameboard.BOARD_SIZE || y < 0 || y >= Gameboard.BOARD_SIZE) return;
            if (!this.#isSurroundingAreaClear(x, y, ship.length, orientation)) return false;

            for (let i = 0; i < ship.length; i++) {
                this.board[x + i][y] = ship;
            }
        }

        ship.placed = true;
        this.ships.push(ship);

        return true;
    }

    // placing ships on the board at random coordinates
    placeShipsRandom(ships) {
        ships.forEach(ship => {
            let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            let result;

            do {
                let startingCoords = this.findRandomMove();
                result = this.placeShip(ship, orientation, startingCoords.x, startingCoords.y);
            } while (!result);
        });
    }

    // handling attacks
    receiveAttack(x, y) {
        if (this.board[x][y] === "H" || this.board[x][y] === "M" || this.board[x][y] === "S") return false;
        const target = this.board[x][y];

        if (target instanceof Ship) {
            target.hit();
            target.addHitPosition(x, y);
            this.board[x][y] = "H";
            this.hits.push({ "id": target.id, "x": x, "y": y });

            if (target.isSunk()) {
                this.#markSurroundingFieldsAfterSink(target.hitPositions);

                target.hitPositions.forEach(position => {
                    this.board[position.x][position.y] = "S";
                    this.hits = this.hits.filter(item => !(item.x === position.x && item.y === position.y));
                });
                this.hits = this.hits.filter(item => item.id !== target.id);
            }

            return true;
        } else {
            this.board[x][y] = "M";
            return false;
        }
    }

    // checking if the game is over (return true or false)
    checkGameOver() {
        return this.ships.every(ship => ship.isSunk());
    }
}

export { Gameboard };
