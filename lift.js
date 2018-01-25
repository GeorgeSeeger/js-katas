var theLift = function(queues, capacity) {
    // Your code here!
    return [999]
  }
function Person(location, destination) {
    this.location = location;
    this.destination = destination;
    this.dir = location > destination ? 'up' : 'down';
}
Person.prototype.constructor = Person;

function Lift(queues, capacity) {
    this.queues = queues.map(function(a, i){ return a.map(function(d) { return new Person(i, d); })});
    this.capacity = capacity;
    this.holding = [];
    this.floor = 0;
    this.dir = 'up';
    this.dirs = ['up', 'down'];
}

Lift.prototype.constructor = Lift;
Lift.prototype.isEmpty = function() { return this.holding.length === 0; }
Lift.prototype.findClosestInSameDirection = function() {
    return this.queues.filter(function(a){
        return a.length > 0;
    }).sort(function(a) {
        return this.floor - a[0].location;
    }, this)
    .find(function(a) {
         return a.some(function(p) { return p.dir === this.dir; }, this);
    }, this)[0]
    .location;
}
Lift.prototype.findFurthestInOppositeDirection = function() {
    return this.queues.filter(function(a){
        return a.length > 0;
    }).sort(function(a) {
        return a[0].location - this.floor;
    }, this)
    .find(function(a) {
        return a.some(function(p) { return p.dir !== this.dir; }, this)
    }, this)[0]  
   .location;
}