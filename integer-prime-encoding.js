function encode(n) {
  
}

function decode(n) {
  
}

function Prime() {
    this.primes = [];
    this.generatePrimes();
}
Prime.prototype.generatePrimes = function(limit) {
    var array = new Array(limit);
    this.primes = [];    
    for (var j = 2; j < Math.sqrt(limit); j++) {
        for (var i = j * j; i < limit; i += j) {
            array[i] = true;
        }
    }
    for (var k = 2; k < limit; k++) {
        if (!array[k]) this.primes.push(k);
    }
}
Prime.prototype.constructor = Prime;
Prime.prototype.decompose = function(n) {
    var div = n;
    var ans = [];
    if (this.primes.includes(n)) return [n];
    while (!this.primes.includes(div)) {
        
    }
}
Prime.prototype.indexOf = function(n) { return this.primes.indexOf(n); }