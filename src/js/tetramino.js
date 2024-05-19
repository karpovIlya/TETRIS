import { COLLUMN_AMOUNT } from "./consts.js";

export class Tetramino {
  constructor() {
    this._tetraminoKey = ["O", "I", "Z", "L", "T"];
    this._tetramino = {
      O: [
        [1, 1],
        [1, 1],
      ],
      I: [[1, 1, 1, 1]],
      Z: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      L: [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      T: [
        [1, 1, 1],
        [0, 1, 0],
      ],
    };
    this._currentTetramino = this.getRandomTetramino();
    this._currentColumn =
      COLLUMN_AMOUNT / 2 - Math.floor(this._currentTetramino[0].length / 2);
    this._currentRow = 0;
  }

  getRandomTetramino() {
    const tetraminoRandomIndex = Math.floor(
      Math.random() * this._tetraminoKey.length
    );
    const tetraminoKey = this._tetraminoKey[tetraminoRandomIndex];

    return this._tetramino[tetraminoKey];
  }

  moveDown() {
    this._currentRow++;
  }

  moveLeft() {
    this._currentColumn--;
  }

  moveRight() {
    this._currentColumn++;
  }

  getCurrentTetramino() {
    return this._currentTetramino;
  }

  getCurrentCollumn() {
    return this._currentColumn;
  }

  getCurrentRow() {
    return this._currentRow;
  }
}
