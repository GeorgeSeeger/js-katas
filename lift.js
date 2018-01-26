var theLift = function(queues, capacity) {
    var floorsVisited = [ 0 ];
    var lift = new Lift(queues, capacity);
    while (lift.queues.some(function(q) { return q.length > 0; })) {
        if (lift.isEmpty()) {
            var floor = lift.findClosestInSameDirection();
            if (!floor) { 
                floor = lift.findFurthestInOppositeDirection();
                lift.dir = lift.dirs.find(function(d) { return d !== lift.dir; })
                if (!floor) return floorsVisited;
            }
            lift.floor = floor;
            floorsVisited.push(floor);
            lift.stopAtFloor();
        } else {
            
        }
    }
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
    for(var i = 0; i < queue.length; i++){
        if (this.holding.length < this.capacity && queue[i].dir === this.dir) {
            this.holding.push(queue[i]);
            queue[i] = null;
        }
    }
    this.queues[this.floor] = queue.filter(function(p) { return p; });    
}