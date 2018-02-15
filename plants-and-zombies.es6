function plantsAndZombies(lawn,zombies){
	//your code goes here. you can do it!
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(c) {
        return c.x == this.x && c.y == this.y;
    }
}

class Zombie {
    constructor(info, limit) {
        this.delay = info[0];
        this.row = info[1];
        this.hp = info[2];
        this.boardLimit = limit;
    }

    move() {
        if (this.delay > 0) this.delay--;
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

    shotsLand(board) {
        if (this.isStraightShooter) {
            return new Array(board[0].length - this.position.x - 1).map((a, i) => [new Coord(i, this.position.y), this.damage]);
        } 
        
    } 
}