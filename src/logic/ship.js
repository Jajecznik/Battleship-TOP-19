class Ship {
    constructor(id, length, name) {
        this.id = id;
        this.name = name;
        this.length = length;
        this.hitPositions = [];
        this.hitCounter = 0;
        this.placed = false;
        this.sunk = false;
    }

    // adding coordinates of hitted position
    addHitPosition(x, y) {
        this.hitPositions.push({ x, y });
    }

    // increasing the number of hits of the ship
    hit() {
        if (this.hitCounter < this.length) {
            this.hitCounter += 1;
            this.sunk = this.hitCounter === this.length;
        }
    }

    // checking if the ship is sunk (return true or false)
    isSunk() {
        return this.sunk;
    }

    // checking if ship is placed on the bord (return true or false)
    isPlaced() {
        return this.placed;
    }
}

export { Ship };
