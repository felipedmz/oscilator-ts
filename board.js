// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
//
// It’s a simple 2-dimensional automata where each cell can be either alive or dead. 
// Each “clock tick” updates the live/dead status of each cell based on the following rules: 
// * Any live cell with fewer than two live neighbors dies, as if by underpopulation.
// * Any live cell with two or three live neighbors lives on to the next generation.
// * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. 
// * Any live cell with more than three live neighbors dies, as if by overpopulation.
//
// Your code should demonstrate its correct with this test: 
// 1st generation: [ 
//   [0,1,0], 
//   [0,1,0], 
//   [0,1,0] 
// ]
// 2nd generation: [ 
//   [0,0,0], 
//   [1,1,1], 
//   [0,0,0] 
// ]
// 3rd generation:  [ 
//   [0,1,0], 
//   [0,1,0], 
//   [0,1,0] 
//]
//
// Please write a class called board that has at least 
// the following public methods:
// board.init( initial_state [] )
// board.tick() 
// board.print()
//
// 0 1 0
// 0 1 0
// 0 1 0
var Board = /** @class */ (function () {
    function Board() {
        this.linesLimit = 0;
    }
    Board.prototype.init = function (initialState) {
        var _this = this;
        this.state = initialState;
        this.nextState = initialState;
        this.columnsLimit = this.state.length - 1;
        // @TODO Refactor line count
        this.state.forEach(function () { return _this.linesLimit++; });
        this.linesLimit--;
    };
    Board.prototype.print = function () {
        console.log(this.state);
    };
    Board.prototype.tick = function () {
        // @TODO Allow recursiveness
        for (var i = 0; i <= this.linesLimit; i++) {
            for (var j = 0; j <= this.columnsLimit; j++) {
                console.log("WALKING ON BOARD", i, j);
                this.checkNeighbors(this.state[i][j], i, j);
            }
        }
        this.state = this.nextState;
    };
    Board.prototype.checkNeighbors = function (cellState, x, y) {
        var _this = this;
        var total = 0;
        var defaultCheckX = [-1, 0, 1];
        var defaultCheckY = [-1, 0, 1];
        var avoidSelfCheckY = [-1, 1];
        defaultCheckX.forEach(function (xVariation) {
            var xVariated = x + xVariation;
            if (xVariated < 0 || xVariated > _this.linesLimit) {
                console.log("RETURN, xVariatedCheck=", xVariated);
                return;
            }
            var yCheck = defaultCheckY;
            if (xVariation == 0) {
                console.log("AVOID CHECK SELF, overide yCheck");
                yCheck = avoidSelfCheckY;
            }
            yCheck.forEach(function (yVariation) {
                var yVariated = y + yVariation;
                console.log("NEIGHBOR", xVariated, yVariated, "VALUE", _this.state[xVariated][yVariated], "ALIVE", _this.isAlive(_this.state[xVariated][yVariated]));
                //
                if (yVariated < 0 || yVariated > _this.columnsLimit) {
                    console.log("RETURN");
                    return;
                }
                if (_this.isAlive(_this.state[xVariated][yVariated])) {
                    total++;
                }
            });
        });
        //
        this.decideDestiny(cellState, total, x, y);
    };
    Board.prototype.isAlive = function (cellState) {
        return cellState == 1;
    };
    Board.prototype.decideDestiny = function (cellState, liveNeighbors, x, y) {
        console.log("VALUE", cellState, "TOTAL", liveNeighbors);
        if (this.isAlive(cellState) && (liveNeighbors == 2 || liveNeighbors == 3)) {
            this.lives(x, y);
        }
        else if (!this.isAlive(cellState) && liveNeighbors == 3) {
            this.lives(x, y);
        }
        else {
            this.dies(x, y);
        }
    };
    Board.prototype.lives = function (x, y) {
        console.log("OLD=", x, y, "=", this.nextState[x][y]);
        this.nextState[x][y] = 1;
        console.log("NEW=", x, y, "=", this.nextState[x][y]);
        console.log("DECISION LIVES");
    };
    Board.prototype.dies = function (x, y) {
        console.log("OLD=", x, y, "=", this.nextState[x][y]);
        this.nextState[x][y] = 0;
        console.log("NEW=", x, y, "=", this.nextState[x][y]);
        console.log("DECISION DIES");
    };
    return Board;
}());
var oscilatorInitial = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
];
console.log(oscilatorInitial);
var board = new Board();
board.init(oscilatorInitial);
// 0, 0, 0
// 1,
board.tick();
board.print();
//board.tick()
//board.print()
//board.tick()
//board.print()
