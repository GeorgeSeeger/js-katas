var theLift = function(queues, capacity) {
    var floorsVisited = [ 0 ];
    var lift = new Lift(queues, capacity);
    while (lift.queues.some(function(q) { return q.length > 0; }) || lift.holding.length != 0) {
        if (lift.floor === 0) lift.dir = 'up';
        if (lift.floor === lift.maxFloor) lift.dir = 'down';
        if (lift.isEmpty()) {
            var floor = lift.findClosestInSameDirection();
            if (floor === undefined) { 
                floor = lift.findFurthestInOppositeDirection();
                lift.switchDirection();
            }
            if (floor !== undefined) {
                if (lift.floor !== floor) { floorsVisited.push(floor); }
                lift.floor = floor;
                lift.stopAtFloor();
            }
        } else {
            lift.floor += lift.dir === 'up' ? 1 : -1;
            if (lift.holding.some(function(p) { return p.destination == lift.floor; }) || (!lift.isFull() && lift.queues[lift.floor].some(function(p) { return p.location == lift.floor; }))) {
                floorsVisited.push(lift.floor);
            }
            lift.stopAtFloor();
        }
    }
    if (lift.floor != 0) floorsVisited.push(0);
    return floorsVisited;
}

function Person(location, destination) {
    this.location = location;
    this.destination = destination;
    this.dir = location < destination ? 'up' : 'down';
}
Person.prototype.constructor = Person;

function Lift(queues, capacity) {
    this.queues = queues.map(function(a, i){ return a.map(function(d) { return new Person(i, d); })});
    this.capacity = capacity;
    this.holding = [];
    this.floor = 0;
    this.maxFloor = queues.length - 1;
    this.dir = 'up';
    this.dirs = ['up', 'down'];
}

Lift.prototype.constructor = Lift;
Lift.prototype.isEmpty = function() { return this.holding.length === 0; }
Lift.prototype.isFull = function() { return this.holding.length === this.capacity; }
Lift.prototype.findClosestInSameDirection = function() {
    for (var i = this.floor; i >= 0 && i <= this.maxFloor; this.dir === 'up' ? i++: i--) {
        if (this.queues[i].length > 0 && this.queues[i].some(function(p) { return p.dir === this.dir; }, this)) {
            return i;
        }
    }
}
Lift.prototype.findFurthestInOppositeDirection = function() {
    for (var i = this.dir === 'up' ? this.maxFloor : 0; i >= 0 && i <= this.maxFloor; this.dir === 'up' ? i--: i++) {
        if (this.queues[i].length > 0 && this.queues[i].some(function(p) { return p.dir !== this.dir; }, this)) {
            return i;
        }
    }
}
Lift.prototype.stopAtFloor = function() {
    var queue = this.queues[this.floor];
    this.holding = this.holding.filter(function(p) { return p.destination !== this.floor; }, this);
    if (this.isEmpty() && !this.findClosestInSameDirection()) {
        this.switchDirection();
    }
    for(var i = 0; i < queue.length; i++){
        if (!this.isFull() && queue[i].dir === this.dir) {
            this.holding.push(queue[i]);
            queue[i] = null;
        }
    }
    this.queues[this.floor] = queue.filter(function(p) { return p; });    
}
Lift.prototype.switchDirection = function() { this.dir = this.dirs.find(function(d) { return d !== this.dir; }, this); }
theLift([ [], [ 2 ], [ 3, 3, 3 ], [ 1 ], [], [], [] ], 1)