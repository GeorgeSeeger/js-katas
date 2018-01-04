function parseMolecule(formula) {
  return new Molecule(formula).formula;
}

class Molecule {
  constructor(string) {
    this.formula = {};    
    this.parse(string)
  }

  add(molecule) {
    Object.keys(molecule.formula).forEach(v => {
      this.formula[v] = this.formula[v] || 0 + molecule.formula[v]
    });
  }

  multiply(int) {
    Object.keys(this.formula).forEach(v => this.formula[v] *= int);
  }

  

  parse(string) {
    var brackets = [["(", "[" , "{",],[ "}", "]",")"]];
    var inBracket = false;
    var bracketLevel = 0;
    var bracketContent = [];
    var last = null;
    for (var i = 0; i < string.length; i++) {
      var c = string[i];
      
      if (brackets[0].includes(c)) {
        inBracket = true;
        bracketLevel += 1;
      } else if (brackets[1].includes(c)) {
        bracketLevel -= 1
        if (bracketLevel == 0) {
           inBracket = false;
           last = new Molecule(bracketContent.join(""));
           bracketContent = [];
        }
      } else {
        if (inBracket) {
          bracketContent.push(c)
        } else {
          if (!isNaN(c)) {
            if (last instanceof Molecule) {
              this.add(last.multiply(c - 1));
            } else {
              this.formula[last] += c - 1;
            }
          } else {
            if (c == c.toUpperCase()) {
              last = c;
              var nextChar = string[i+1] && string[i+1] == string[i+1].toLowerCase() ? string[i+1] : "";
              last += nextChar;
            }
          }
          
          if (last instanceof Molecule) {
            this.add(last);
          } else if (last) {
            this.formula[last] = 1;
            last = null; 
          }
        }
      }
    }
  }
}