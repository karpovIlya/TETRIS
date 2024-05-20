import { COLLUMN_AMOUNT, ROW_AMOUNT } from "./consts.js";
import {
  addActiveCell,
  clearPlayfieldDiv,
  startDeleteRowAnimation,
  stopDeleteRowAnimation,
  stopGameDom,
} from "./domUtils.js";
import { Tetramino } from "./tetramino.js";
import { rotateMatrix } from "./utilities.js";

export class Tetris {
  constructor() {
    this._tetrisPlayfield = new Array(ROW_AMOUNT)
      .fill(0)
      .map(() => new Array(COLLUMN_AMOUNT).fill(0));

    this._tetraminoObj = new Tetramino();
    this._currentTetramino = this._tetraminoObj.getCurrentTetramino();
    this._currentTetraminoRow = this._tetraminoObj.getCurrentRow();
    this._currentTetraminoCol = this._tetraminoObj.getCurrentCollumn();
  }

  _updateTetraminoState() {
    this._currentTetraminoRow = this._tetraminoObj.getCurrentRow();
    this._currentTetraminoCol = this._tetraminoObj.getCurrentCollumn();
  }

  _clearPlayfield() {
    clearPlayfieldDiv();
    for (let row = 0; row < this._tetrisPlayfield.length; row++) {
      for (let col = 0; col < this._tetrisPlayfield[row].length; col++) {
        if (this._tetrisPlayfield[row][col] === 1) {
          this._tetrisPlayfield[row][col] = 0;
        }
      }
    }

    this._fillPostedTetramino();
  }

  _stopGame() {
    clearPlayfieldDiv();
    for (let row = 0; row < this._tetrisPlayfield.length; row++) {
      for (let col = 0; col < this._tetrisPlayfield[row].length; col++) {
        this._tetrisPlayfield[row][col] = 0;
      }
    }
  }

  _isOutsOfGameBoard(rowInInPlayfield, colInInPlayfield) {
    return (
      colInInPlayfield < 0 ||
      rowInInPlayfield < 0 ||
      colInInPlayfield >= COLLUMN_AMOUNT ||
      rowInInPlayfield >= ROW_AMOUNT ||
      this._currentTetraminoRow + this._currentTetramino.length >=
        ROW_AMOUNT + 1
    );
  }

  _isColideWithPass(movedTetraminoCol) {
    for (let row = 0; row < this._currentTetramino.length; row++) {
      for (let col = 0; col < this._currentTetramino[row].length; col++) {
        if (!this._currentTetramino[row][col]) continue;

        const rowInPlayfield = row + this._currentTetraminoRow;
        const colInPlayfield = col + movedTetraminoCol;

        if (this._tetrisPlayfield[rowInPlayfield][colInPlayfield] === 2) {
          return false;
        }
      }
    }

    return true;
  }

  _isColideWithPost() {
    for (let row = 0; row < this._currentTetramino.length; row++) {
      for (let col = 0; col < this._currentTetramino[row].length; col++) {
        if (!this._currentTetramino[row][col]) continue;

        const rowInPlayfield = row + this._currentTetraminoRow;
        const colInPlayfield = col + this._currentTetraminoCol;

        if (rowInPlayfield === this._tetrisPlayfield.length - 1) continue;
        if (
          this._isOutsOfGameBoard(rowInPlayfield, colInPlayfield) ||
          this._tetrisPlayfield[rowInPlayfield + 1][colInPlayfield] === 2
        ) {
          return true;
        }
      }
    }

    return (
      this._currentTetraminoRow + this._currentTetramino.length >= ROW_AMOUNT
    );
  }

  _isValidPositionAfterRotate(newTetramino, newRow, newCol) {
    for (let row = 0; row < newTetramino.length; row++) {
      for (let col = 0; col < newTetramino[row].length; col++) {
        if (!newTetramino[row][col]) continue;

        const rowInPlayfield = row + newRow;
        const colInPlayfield = col + newCol;

        if (
          this._isOutsOfGameBoard(rowInPlayfield, colInPlayfield) ||
          this._tetrisPlayfield[rowInPlayfield][colInPlayfield] === 2
        ) {
          return false;
        }
      }
    }

    return true;
  }

  _fillPostedTetramino() {
    for (let row = 0; row < ROW_AMOUNT; row++) {
      for (let col = 0; col < COLLUMN_AMOUNT; col++) {
        if (this._tetrisPlayfield[row][col] === 2) {
          addActiveCell(row, col);
        }
      }
    }
  }

  _updateTetramino() {
    this._tetraminoObj = new Tetramino();
    this._currentTetramino = this._tetraminoObj.getCurrentTetramino();
    this._currentTetraminoRow = this._tetraminoObj.getCurrentRow();
    this._currentTetraminoCol = this._tetraminoObj.getCurrentCollumn();
  }

  _checkingLoss() {
    const middleСolumn = COLLUMN_AMOUNT / 2 - 1;
    const limitRow = 1;

    if (this._tetrisPlayfield[limitRow][middleСolumn] === 2) {
      this._stopGame();
      stopGameDom();
    }
  }

  _deleteAllFullFieledRows() {
    let amountOfDeleteRows = 0;

    for (let row = this._tetrisPlayfield.length - 1; row >= 0; row--) {
      let fullFieledCounter = 0;

      for (let col = 0; col < this._tetrisPlayfield[row].length; col++) {
        const cell = this._tetrisPlayfield[row][col];

        if (cell === 2) {
          fullFieledCounter++;
        }
      }

      if (fullFieledCounter === this._tetrisPlayfield[row].length) {
        startDeleteRowAnimation(this._tetrisPlayfield, row);
        this._tetrisPlayfield.splice(row, 1);

        setTimeout(() => {
          stopDeleteRowAnimation(this._tetrisPlayfield, row);
        }, 500);

        amountOfDeleteRows++;
      }
    }

    for (let i = 0; i < amountOfDeleteRows; i++) {
      this._tetrisPlayfield.unshift(
        new Array(this._tetrisPlayfield[0].length).fill(0)
      );
    }
  }

  addTetraminoToPlayfield() {
    let isShouldPostTetramino = this._isColideWithPost();

    for (let row = 0; row < this._currentTetramino.length; row++) {
      for (let col = 0; col < this._currentTetramino[row].length; col++) {
        const rowInPlayfield = row + this._currentTetraminoRow;
        const colInPlayfield = col + this._currentTetraminoCol;

        if (!this._currentTetramino[row][col]) continue;

        this._tetrisPlayfield[rowInPlayfield][colInPlayfield] =
          !isShouldPostTetramino ? this._currentTetramino[row][col] : 2;

        addActiveCell(rowInPlayfield, colInPlayfield);
      }
    }

    if (isShouldPostTetramino) {
      this._updateTetramino();
      this._fillPostedTetramino();
      this._deleteAllFullFieledRows();
      this._checkingLoss();
    }
  }

  rotateTetramino() {
    const newTetramino = rotateMatrix(this._currentTetramino);

    if (
      this._isValidPositionAfterRotate(
        newTetramino,
        this._currentTetraminoRow,
        this._currentTetraminoCol
      )
    ) {
      this._currentTetramino = newTetramino;
      this._clearPlayfield();
      this.addTetraminoToPlayfield();
    }
  }

  moveTetraminoDown() {
    const bottomLimitRow =
      this._currentTetraminoRow + this._currentTetramino.length;

    if (!this._isOutsOfGameBoard(bottomLimitRow, 0)) {
      this._tetraminoObj.moveDown();
      this._updateTetraminoState();
      this._clearPlayfield();
      this.addTetraminoToPlayfield();
    }
  }

  moveTetraminoRight() {
    const rightLimitCol =
      this._currentTetraminoCol + this._currentTetramino[0].length;

    if (
      !this._isOutsOfGameBoard(0, rightLimitCol) &&
      this._isColideWithPass(this._currentTetraminoCol + 1)
    ) {
      this._tetraminoObj.moveRight();
      this._updateTetraminoState();
      this._clearPlayfield();
      this.addTetraminoToPlayfield();
    }
  }

  moveTetraminoLeft() {
    if (
      !this._isOutsOfGameBoard(0, this._currentTetraminoCol - 1) &&
      this._isColideWithPass(this._currentTetraminoCol - 1)
    ) {
      this._tetraminoObj.moveLeft();
      this._updateTetraminoState();
      this._clearPlayfield();
      this.addTetraminoToPlayfield();
    }
  }
}
