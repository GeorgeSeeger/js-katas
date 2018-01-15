function countPatternsFrom(firstDot, length) {
  if (length < 1 || length >= 10) { return 0; }
  return patternsFrom(firstDot, length).length;
}

var memo = {};
function patternsFrom(firstDot, length) {
  if (memo[firstDot]) {
    var dotMemo = memo[firstDot];
    if (dotMemo[length]) { return dotMemo[length]; }
    var patterns = patternsFrom(firstDot, length - 1);
    dotMemo[length] = patterns.map(function(p) {
      return p.available().map(function(d){
        return p.connect(d);
      })
    }).reduce(function(acc, a) { return acc.concat(a); });
    return dotMemo[length];
  } else {
    memo[firstDot] = [[], [ new Pattern().connect(firstDot) ]];
    return patternsFrom(firstDot, length);
  }
}

function Pattern(selected) {
  this.selected =  selected || [];
  this.dots = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  this.dots = selected == null
              ? this.dots
              : this.dots.filter(function(d){ return !selected.includes(d) });
}

Pattern.prototype = function P() {}
Pattern.prototype.constructor = Pattern;
Pattern.prototype.last = function() { return this.selected.slice(-1)[0]; }
Pattern.prototype.connect = function(d) { return new Pattern(this.selected.concat([d])); }
Pattern.prototype.debug = function() { return this.selected.join("-") + " | " + this.available().join(","); }
Pattern.prototype.available = function() {
  var last = this.last();
  var cross = ['B','F','H','D'];
  var corners = {
    'A': [['B', 'C'], ['E', 'I'], ['D', 'G']],
    'C': [['F', 'I'], ['E', 'G'], ['B', 'A']],
    'I': [['H', 'G'], ['E', 'A'], ['F', 'C']],
    'G': [['D', 'A'], ['E', 'C'], ['H', 'I']]
  };
  var selected = this.selected;
  var dots = this.dots;
  if (last === "E") {
    return dots;
  } else if (cross.includes(last)) {
    var index = cross.indexOf(last);
    var blocked = cross.find(function(e, i) { return dots.includes('E') && i === (index + 2) % 4; });
    return dots.filter(function(d) { return d !== blocked; });
  } else {
    return dots.filter(function(d) {
       return !corners[last].map(function(a) { return selected.includes(a[0]) ? a[0] : a[1] })
                            .includes(d)
    }); 
  }
}