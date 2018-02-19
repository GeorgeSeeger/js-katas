function plantsAndZombies(lawn,zombies){
    var plants = [];
    for (var i = 0; i < lawn.length; i++)
         for (var j = 0; j < lawn[0].length; j++)
             if (lawn[i][j] !== ' ') plants.push(new Plant(lawn[i][j], j, i));
    var demZombies = zombies.map(a => new Zombie(a, lawn[0].length));
    var turns = 0
    while (true) {
        if (!demZombies.some()) return null;
        if (!plants.some()) return turns;
        turns++;

        demZombies.forEach(z => z.move());
        plants = plants.filter(p => !demZombies.some(z => p.position.isEqual(z.position)));
        // now shoot
    }
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(c) { return c instanceof Coord && c.x == this.x && c.y == this.y; }
}

class Zombie {
    constructor(info, limit) {
        this.delay = info[0];
        this.row = info[1];
        this.hp = info[2];
        this.boardLimit = limit;
    }

    move() {
        if (this.delay > 0) {
            this.delay--;
            return;
        }
        if (this.delay == 0 && this.position == undefined){
            this.position = new Coord(this.limit + 1, this.row);
        }
        this.position.x--;
    }

    takeHit(dmg) { this.hp -= dmg; }

    isDead() { return this.hp <= 0; }
}

class Plant {
    constructor(type, x, y) {
        this.position = new Coord(x, y);
        this.isStraightShooter = !isNaN(type);
        this.damage = this.isStraightShooter ? parseInt(type) : 1;
    }

    shotsLandOn(board) {
        var lineCoords = new Array(board[0].length - this.position.x - 1).fill(0).map((a, i) => new Coord(i + 1, this.position.y), this);
        if (this.isStraightShooter) {
            var shots = [lineCoords]
            for (var i = 0; i < this.damage; i++) {
                shots.push(lineCoords.slice(0));
            }
            return shots;
        } 
        var lowerDiagonal = new Array(Math.abs(board.length - this.position.y - 1)).fill(0).map((a, i) => new Coord(this.position.x + i + 1, this.position.y + i + 1), this);
        var upperDiagonal = new Array(this.position.y).fill(0).map((a, i) => new Coord(this.position.x + i + 1, this.position.y - i - 1), this);
        return [upperDiagonal, lineCoords, lowerDiagonal];
    } 
}