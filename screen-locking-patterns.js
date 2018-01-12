function countPatternsFrom(firstDot, length) {
  if (length < 1 || length >= 10) { return 0; }
  var patterns = [ new Pattern().connect(firstDot) ]
  for (var i = 1; i < length; i++) {
    patterns = patterns.map(function(p) {
      return p.available().map(function(d){
        return p.connect(d);
      });
    }).reduce(function(acc, e) {return acc.concat(e); });
  }
  return patterns.length;
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
Pattern.prototype.connect = function(d) { return new Pattern(this.selected.concat([d])); }
Pattern.prototype.available = function() {
  var last = this.last();
  var cross = ['B','F','H','D'];
  var corners = {
    'A': [['B', 'C'], ['E', 'I'], ['D', 'G']],
    'C': [['F', 'I'], ['E', 'G'], ['B', 'A']],
    'I': [['F', 'C'], ['E', 'A'], ['H', 'G']],
    'G': [['H', 'I'], ['E', 'A'], ['D', 'A']]
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


  countPatternsFrom('D', 3)