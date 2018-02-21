function plantsAndZombies(lawn,zombiesInfo){
    var plants = [];
    for (var i = 0; i < lawn.length; i++)
         for (var j = 0; j < lawn[0].length; j++)
             if (lawn[i][j] !== ' ') plants.push(new Plant(lawn[i][j], j, i));
    var zombies = zombiesInfo.map(info => new Zombie(info, lawn[0].length));
    var turns = 0
    while (true) {
        turns++;

        zombies.forEach(z => z.move());
        plants = plants.filter(p => !zombies.some(z => p.position.isEqual(z.position)));
        if (zombies.some(z => z.position !== undefined && z.position.x < 0 )) return turns;
        
        var shots = [].concat.apply([], plants.map(p => p.shotsLandOn(lawn)));
        shots.forEach(shotList => {
            for (var shot of shotList) {
                var zombie;
                if (zombie = zombies.find(z => shot.isEqual(z.position) && !z.isDead())) {
                    zombie.takeHit();
                    break;
                }
            }
        })
        zombies = zombies.filter(z => !z.isDead());
        if (zombies.length === 0) return null;
        
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
            this.position = new Coord(this.boardLimit + 1, this.row);
        }
        this.position.x--;
    }

    takeHit() { this.hp -= 1; }

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

plantsAndZombies([
    '2       ',
    '  S     ',
    '21  S   ',
    '13      ',
    '2 3     '],
[[0,4,28],[1,1,6],[2,0,10],[2,4,15],[3,2,16],[3,3,13]]) //10