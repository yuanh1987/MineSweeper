export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
      return
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighberBombs(rowIndex, columnIndex);
    }
    return this._numberOfTiles--;
  }

  getNumberOfNeighberBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    this._numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      let neighborRowIndex = rowIndex + offset[0];
      let neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          this._numberOfBombs++;
        };
      };
    })
    return this._numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    //this._playerBoardboard = this.playerBoard.map(row => row.join(' | ')).join('\n'); doesn't work
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numOfRows, numOfColumns) {
    const board = [];
    for (let i = 0; i < numOfRows; i++) {
      let row = [];
      board.push(row);
      for (let j = 0; j < numOfColumns; j++) {
        row.push(' ');
      }
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      board.push(row);
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
    }
  let numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfRows);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    };
  };
    return board;
  }
};
