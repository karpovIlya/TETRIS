import { COLLUMN_AMOUNT, ROW_AMOUNT } from "./consts.js";
import { Tetris } from "./tetris.js";
import { Tetramino } from "./tetramino.js";

const gameDiv = document.getElementById("game");

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

export const addActiveCell = (rowIndex, colIndex) => {
  const activeCell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
  activeCell.classList.add("cell-active");
};

export const clearPlayfieldDiv = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("cell-active"));
};

export const startGame = () => {
  const playfieldDiv = createPlayfield();
  const logo = document.getElementById("logo");

  logo.remove();
  gameDiv.innerHTML = "";
  gameDiv.appendChild(playfieldDiv);

  const tetris = new Tetris();

  tetris.addTetraminoToPlayfield();

  window.addEventListener("keydown", (event) => {
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
  });

  // setInterval(() => tetris.moveTetraminoDown(), 500);
};
