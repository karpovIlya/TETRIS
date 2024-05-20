import { COLLUMN_AMOUNT, ROW_AMOUNT, FIGURES_INDEXES } from "./consts.js";
import { Tetris } from "./tetris.js";

const gameDiv = document.getElementById("game");
const tetris = new Tetris();
let movingIntervalId = 0;

const createPlayfield = () => {
  const playfieldDiv = document.createElement("div");
  playfieldDiv.classList.add("playfield");

  for (let row = 0; row < ROW_AMOUNT; row++) {
    for (let col = 0; col < COLLUMN_AMOUNT; col++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.id = `cell-${row}-${col}`;

      playfieldDiv.appendChild(cellDiv);
    }
  }

  return playfieldDiv;
};

const keydownHandler = (event) => {
  switch (event.key) {
    case "ArrowUp":
      tetris.rotateTetramino();
      break;
    case "ArrowDown":
      tetris.moveTetraminoDown();
      break;
    case "ArrowRight":
      tetris.moveTetraminoRight();
      break;
    case "ArrowLeft":
      tetris.moveTetraminoLeft();
      break;
  }
};

const startFallingTetramino = () => {
  tetris.addTetraminoToPlayfield();
  movingIntervalId = setInterval(() => tetris.moveTetraminoDown(), 500);
};

const stopFallingTetramino = () => {
  clearInterval(movingIntervalId);
  window.removeEventListener("keydown", keydownHandler);
};

const toggleEndGameAnimation = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.toggle("animate-spin"));
};

const drawFigureOnPlayfield = (figureIndexes) => {
  figureIndexes.forEach((figureRow) => {
    const rowInInPlayfield = figureRow[0];
    const colInInPlayfield = figureRow[1];

    addActiveCell(rowInInPlayfield, colInInPlayfield);
  });
};

export const addActiveCell = (rowIndex, colIndex) => {
  const activeCell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
  activeCell.classList.add("cell-active");
};

export const startDeleteRowAnimation = (playfield, row) => {
  playfield[row].forEach((_, collIndex) => {
    const cell = document.getElementById(`cell-${row}-${collIndex}`);
    cell.classList.add("animate-spin");
  });
};

export const stopDeleteRowAnimation = (playfield, row) => {
  playfield[row].forEach((_, collIndex) => {
    const cell = document.getElementById(`cell-${row}-${collIndex}`);
    cell.classList.remove("animate-spin");
  });
};

export const clearPlayfieldDiv = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("cell-active"));
};

export const startGameDom = () => {
  const playfieldDiv = createPlayfield();
  const logo = document.getElementById("logo");

  logo.remove();
  gameDiv.innerHTML = "";
  gameDiv.appendChild(playfieldDiv);

  drawFigureOnPlayfield(FIGURES_INDEXES.threeDigitIndexes);

  setTimeout(() => {
    clearPlayfieldDiv();
    drawFigureOnPlayfield(FIGURES_INDEXES.twoDigitIndexes);
  }, 1000);

  setTimeout(() => {
    clearPlayfieldDiv();
    drawFigureOnPlayfield(FIGURES_INDEXES.oneDigitIndexes);
  }, 2000);

  setTimeout(() => {
    clearPlayfieldDiv();
    window.addEventListener("keydown", keydownHandler);
    startFallingTetramino();
  }, 3000);
};

export const stopGameDom = () => {
  drawFigureOnPlayfield(FIGURES_INDEXES.sadSmileIndexes);
  toggleEndGameAnimation();
  setTimeout(toggleEndGameAnimation, 1000);

  stopFallingTetramino();
};
