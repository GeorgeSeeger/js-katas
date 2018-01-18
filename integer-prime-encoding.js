function encode(n) {
    var binary = bracketEncode(primes.decompose(n)).toBinaryString().split(',').join("").split("");
    while (binary.pop() === "0") { }
    return parseInt(binary.join("").slice(1), 2);
}

function decode(n) {
  var binary = n.toString(2);
  binary = "1" + binary + "1" + "0".repeat(binary.split("1").length - binary.split("0").length + 2);
  var arr = eval(binary.split("1").join("[").split("0").join("]").split("][").join("],["));
  return bracketDecode(arr).reduce(function(acc, i) { return acc * i; });
}

function bracketEncode(arr) {
    return arr.map(function(i) {
        return i === 2
             ? []
             : bracketEncode(primes.decompose(primes.indexOf(i)));
    });
}

function bracketDecode(arr) {
    return arr.map(function(a,i,m) {
        return a.length === 0 
            ? 2
            : primes.fromIndex(bracketDecode(a).reduce(function(acc, i) { return acc * i;}))
    })
}

function Prime() {
    this.primes = [];
    this.generatePrimes(10000000);
}
Prime.prototype.constructor = Prime;
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
Prime.prototype.decompose = function(n) {
    var div = n;
    var ans = [];
    if (this.primes.includes(n)) return [n];
    for (var i = 0; i < this.primes.length; i++) {
        while (div % this.primes[i] === 0) {
            ans.push(this.primes[i]);
            div /= this.primes[i];
        }
        if (this.primes[i] > div) break;
    }
    return ans;
}
Prime.prototype.indexOf = function(n) { return this.primes.indexOf(n) + 1; }
Prime.prototype.fromIndex = function(n) { return this.primes[n - 1]; }
var primes = new Prime();
Array.prototype.toBinaryString = function() { return "1" + this.map(function(o) {return typeof o.toBinaryString === undefined ? o.toString() : o.toBinaryString() }) + "0" }