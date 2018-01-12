function countPatternsFrom(firstDot, length) {
    // Your code here
  }
  
  function P() {}
  function Pattern(selected) {
    this.selected =  selected || [];
    this.dots = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    this.dots = selected == null
                ? this.dots
                : this.dots.filter(function(d){ return !selected.includes(d) });
  }
  
  Pattern.prototype = P
  Pattern.prototype.constructor = Pattern;
  Pattern.prototype.last = function() { return this.selected.slice(-1)[0]; }
  Pattern.prototype.connect = function(d) { return new Pattern(this.selected.concat([d]);) }
  Pattern.prototype.available = function() {
    var last = this.last();
    var cross = ['B','F','H','D'];
    var corners = ['A', 'C', 'I', 'G'];
    if (last === "E") {
      return this.dots;
    } else if (cross.includes(last)) {
      var index = cross.indexOf(last);
      var blocked = cross.find(function(e, i) { return this.dots.includes('E') && i === (index + 2 % 4); }
      return this.dots.filter(function(d) => return d !== blocked; );
    } else {
      //wew
    }
  }
  