function bloxSolver(arr){
    var bloxors = [];
    for(var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === "B") bloxors.push(new Bloxor([[i, j]]));
        }
    }
    while (!bloxors.some(b => b.isSolved(arr))) {
        bloxors = flatten(bloxors.map(b => b.nextGeneration().filter(b => !b.isIllegal(arr))));
    }
    return bloxors.find(b => b.isSolved(arr)).moves.join("");
}

function flatten(arrays) {
    return [].concat.apply([], arrays);
}

class Bloxor {
    constructor(coords, moves = []){
        this.coords = coords;
        this.moves = moves;
        this.orientation = coords.length === 1 ? 'S' : coords[0][0] === coords[1][0] ? 'H' : 'V';
        this.orientations = ['S', 'V', 'H'];
    }

    move(dir) {
        var magnitude = "UR".includes(dir) ? 1 : -1;        
        moves = { 'U': 'VSH', 'L': 'HVS', 'D': 'VSH', 'R': 'HVS' };
        if (this.orientation === "V") {
            if ("LR".includes(dir)) {this.coords.forEach(c => c[1] += magnitude)}
            else {
                var temps = this.coords.map(c => c.join());
                this.coords.map(c => {c[0] += magnitude; c})
                this.coords = this.coords.filter(c => !temps.includes(c.join()))
            }
        }
        if (this.orientation === "H" ){
            if ("UD".includes(dir)) { this.coords.forEach(c => c[0] += magnitude) }
            else {
                var temps = this.coords.map(c => c.join());
                this.coords.map(c => {c[1] += magnitude; c})
                this.coords = this.coords.filter(c => !temps.includes(c.join()))
             }
        }
        if (this.orientation === "S") {
            var loc = this.coords[0];
            var index = "UD".includes(dir) ? 0 : 1;
            loc[index] += magnitude;
            var temp = [loc[0], loc[1]];
            loc[index] += magnitude
            this.coords = [temp, loc];
        }
        this.orientation = moves[dir][this.orientations.indexOf(this.orientation)];
        this.moves.push(dir);
        return this;
    }

    nextGeneration() {
        return ['U', 'L', 'D', 'R'].map(m => new Bloxor(this.coords, this.moves).move(m));
    }

    isIllegal(board) {
        return this.coords.map(c => board[c[0]][c[1]]).includes(0);
    }

    isSolved(board) {
        return this.orientation === "S" && board[this.coords[0][0], this.coords[0][1]] === "X"
    }
}