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

class Board {
  
  private state: Array<Array<number>>
  private nextState: Array<Array<number>>
  private linesLimit: number = -1
  private columnsLimit: number
  
  constructor(initialState: Array<Array<number>>) {
    this.state = Object.create(initialState)
    this.columnsLimit = this.state.length - 1
    this.state.forEach(() => this.linesLimit++)
    this.nextState = this.copyFrame(this.linesLimit, this.columnsLimit)
  }

  copyFrame(lines, columns) {
    var matrix = [];
    for(var i=0; i<=lines; i++) {
      matrix[i] = [];
      for(var j=0; j<=columns; j++) {
        matrix[i][j] = null;
      }
    }
    return matrix
  }

  print() {
    console.log(this.nextState)
  }
  
  tick() {
    // @TODO Allow recursiveness
    for (let i = 0; i <= this.linesLimit; i++) {
      for (let j = 0; j <= this.columnsLimit; j++) {
        // console.log("::::WALKING ON BOARD", i, j)
        this.checkNeighbors(this.state[i][j], i, j)
      }
    }
  }
  
  private checkNeighbors(cellState: number, x: number, y: number) {
    let total = 0
    let defaultCheckX = [-1, 0, 1]
    let defaultCheckY = [-1, 0, 1]
    let avoidSelfCheckY = [-1, 1]
    defaultCheckX.forEach((xVariation) => {
      let xVariated = x+xVariation
      if (xVariated < 0 || xVariated > this.linesLimit) {
        // console.log("RETURN, xVariatedCheck=", xVariated)
        return
      }
      let yCheck = defaultCheckY
      if (xVariation == 0) {
        // console.log("AVOID CHECK SELF, overide yCheck")
        yCheck = avoidSelfCheckY
      }
      yCheck.forEach((yVariation) => {
        let yVariated = y+yVariation
        if (yVariated < 0) {
          // console.log("RETURN, out of range Ok, NEGATIVE yVariated=",yVariated)
          return
        }
        if (yVariated > this.columnsLimit) {
          yVariated--;
          // console.log("RETURN, out of range Ok, TOOMUCH yVariated=",yVariated)
          return
        }
        // console.log("NEIGHBOR", xVariated, yVariated, "VALUE", this.state[xVariated][yVariated], "ALIVE", this.isAlive(this.state[xVariated][yVariated]))
        if (this.isAlive(this.state[xVariated][yVariated])) {
          total++
        }
      })
    })
    //
    this.decideDestiny(cellState, total, x, y)
  }

  private isAlive(cellState): boolean {
    return cellState == 1
  }
  
  private decideDestiny(cellState, liveNeighbors, x, y) {
    // console.log("VALUE", cellState, "TOTAL", liveNeighbors)  
    if (this.isAlive(cellState) && (liveNeighbors == 2 || liveNeighbors == 3)) {
      this.lives(x, y)
    } else if (!this.isAlive(cellState) && liveNeighbors == 3) {
      this.lives(x, y)
    } else {
      this.dies(x, y)
    }
  }
  
  private lives(x: number, y: number) {
    // console.log("OLD ",x,y,"=",this.state[x][y])
    this.nextState[x][y] = 1
    // console.log("NEW ",x,y,"=",this.nextState[x][y])
    // console.log("::::DECISION LIVES")
  }
  private dies(x: number, y: number) {
    // console.log("OLD ",x,y,"=",this.state[x][y])
    this.nextState[x][y] = 0
    // console.log("NEW ",x,y,"=",this.nextState[x][y])
    // console.log("::::DECISION DIES")
  }
}

let board = new Board([
  [0,1,0],  
  [0,1,0],  
  [0,1,0]
])
board.tick()
board.print()

//board.tick()
//board.print()

//board.tick()
//board.print()