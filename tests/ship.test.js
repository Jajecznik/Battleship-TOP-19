import { Ship } from '../src/logic/ship';

test('constructor initializes length, hitCounter and sunk correctly', () => {
    const ship = new Ship(4, 3, 'Submarine');

    expect(ship.id).toBe(4);
    expect(ship.name).toBe('Submarine');
    expect(ship.length).toBe(3);
    expect(ship.hitPositions).toEqual([]);
    expect(ship.hitCounter).toBe(0);
    expect(ship.placed).toBe(false);
    expect(ship.sunk).toBe(false);
});

test('hit method increases hitCounter and updates sunk correctly', () => {
    const ship = new Ship(4, 3, 'Submarine');

    ship.hit();
    expect(ship.hitCounter).toBe(1);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.hitCounter).toBe(2);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.hitCounter).toBe(3);
    expect(ship.sunk).toBe(true);
    ship.hit();
    expect(ship.hitCounter).toBe(3);
    expect(ship.sunk).toBe(true);
});

test('isSunk method works correctly', () => {
    const ship = new Ship(4, 3, 'Submarine');

    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
