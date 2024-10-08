class Player {
    constructor(gameboard, turn, win) {
        this.gameboard = gameboard;
        this.turn = turn;
    }

    // checking if there are two hits next to each other (x or y line)
    #checkForStreak(hits) {
        let xArr = [...hits].sort((a, b) => a.x - b.x);
        let yArr = [...hits].sort((a, b) => a.y - b.y);
        let x = [];
        let y = [];
        let xLen;
        let yLen;

        // checking for horizontal streak
        for (let i = 0; i < xArr.length - 1; i++) {
            if (Math.abs(xArr[i].x - xArr[i + 1].x) === 1) {
                x.push({ "x": xArr[i].x, "y": xArr[i].y });
                xLen = i + 1;
            } else if (x.length > 0) {
                // if streak is over break
                break;
            }
        }

        if (x.length > 0) {
            // adding last position of streak (because of xArr.length-1 in loop)
            x.push({ "x": xArr[xLen].x, "y": xArr[xLen].y });
        }

        // checking for vertical streak
        for (let i = 0; i < yArr.length - 1; i++) {
            if (Math.abs(yArr[i].y - yArr[i + 1].y) === 1) {
                y.push({ "x": yArr[i].x, "y": yArr[i].y });
                yLen = i + 1;
            } else if (y.length > 0) {
                // if streak is over break
                break;
            }
        }

        if (y.length > 0) {
            // adding last position of streak (because of yArr.length-1 in loop)
            y.push({ "x": yArr[yLen].x, "y": yArr[yLen].y });
        }

        if (x.length !== 0 && y.length !== 0) {
            let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

            if (direction === 'horizontal') {
                return { "direction": direction, "fields": x };
            } else if (direction === 'vertical') {
                return { "direction": direction, "fields": y };
            }
        } else if (x.length !== 0) {
            return { "direction": 'horizontal', "fields": x };
        } else if (y.length !== 0) {
            return { "direction": 'vertical', "fields": y };
        } else {
            return null;
        }
    }

    // getting surrounding coordinates
    #getSurroundingCoords(opponentGameboard, x, y) {
        return [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 }
        ].filter(({ x, y }) => opponentGameboard.isWithinBounds(x, y));
    }

    // trying to keep hitting in a straight line
    #continueStreak(opponentGameboard, direction, fields) {
        const firstHit = fields[0];
        const lastHit = fields[fields.length - 1];
        let nextMove;

        if (direction === 'horizontal') {
            nextMove = { x: lastHit.x + 1, y: lastHit.y };

            if (!opponentGameboard.isWithinBounds(nextMove.x, nextMove.y) ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "H" ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "M" ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "S") {
                nextMove = { x: firstHit.x - 1, y: firstHit.y };
            }
        } else if (direction === 'vertical') {
            nextMove = { x: lastHit.x, y: lastHit.y + 1 };

            if (!opponentGameboard.isWithinBounds(nextMove.x, nextMove.y) ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "H" ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "M" ||
                opponentGameboard.board[nextMove.x][nextMove.y] === "S") {
                nextMove = { x: firstHit.x, y: firstHit.y - 1 };
            }
        }

        return opponentGameboard.isWithinBounds(nextMove.x, nextMove.y) &&
            opponentGameboard.board[nextMove.x][nextMove.y] !== "H" &&
            opponentGameboard.board[nextMove.x][nextMove.y] !== "M" &&
            opponentGameboard.board[nextMove.x][nextMove.y] !== "S" ? nextMove : null;
    }

    // attackig adjacent cells of a hit
    #attackAdjacent(opponentGameboard, hit) {
        const surroundingCoords = this.#getSurroundingCoords(opponentGameboard, hit.x, hit.y);

        for (const { x, y } of surroundingCoords) {
            if (opponentGameboard.board[x][y] !== "H" && opponentGameboard.board[x][y] !== "M" && opponentGameboard.board[x][y] !== "S") {
                return { x, y };
            }
        }

        return null;
    }

    // making random move by computer
    computerMove(opponentGameboard) {
        const hits = opponentGameboard.hits;
        let coords;

        if (hits.length > 1) {
            const streak = this.#checkForStreak(hits);

            if (streak) {
                coords = this.#continueStreak(opponentGameboard, streak.direction, streak.fields);
            }
        } else if (hits.length === 1) {
            const hit = hits[hits.length - 1];
            coords = this.#attackAdjacent(opponentGameboard, hit);
        }

        if (!coords) {
            coords = opponentGameboard.findRandomMove();
        }

        this.attack(opponentGameboard, coords.x, coords.y);
    }

    // attacking enemy position
    attack(opponentGameboard, x, y) {
        opponentGameboard.receiveAttack(x, y);
    }
}

export { Player };
