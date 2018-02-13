class Primes {
  static get primes() {
    if (this._primes) return this._primes;
  
    let limit = 5 * Math.pow(10, 7);
    let sqrt = Math.sqrt(limit);
    let n = new Array(limit).fill(true)
    for (let i = 2; i < sqrt; i++) if (n[i]) for (let j = i*i; j < limit; j += i) n[j] = false;
    return this._primes = n;
  }
  
  static * stream() {
    for(let i = 2; i < this.primes.length; i++) if (this.primes[i]) yield i;
  }
}