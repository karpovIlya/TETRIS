import { COLLUMN_AMOUNT, ROW_AMOUNT, SAD_SMILE_INDEX } from "./consts.js";
import { Tetris } from "./tetris.js";

const gameDiv = document.getElementById("game");
let tetris = new Tetris();
let movingIntervalId = 0;
let playfieldSwiper = null;

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

const createAdditionalInfoDiv = () => {
  const additionalDiv = document.createElement("div");
  const smallLogo = document.createElement("h1");
  const restartBtn = document.createElement("button");

  additionalDiv.classList.add("additional");

  smallLogo.id = "logo";
  smallLogo.classList.add("logo");
  smallLogo.classList.add("logo-small");
  smallLogo.textContent = "[ TETRIS GAME ]";

  restartBtn.classList.add("button-primary");
  restartBtn.classList.add("mt-5");
  restartBtn.textContent = "RESTART";

  additionalDiv.appendChild(smallLogo);
  additionalDiv.appendChild(restartBtn);

  restartBtn.addEventListener("click", restartGameDom);

  return additionalDiv;
};

const keydownHandler = (event) => {
  event.preventDefault();

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
  playfieldSwiper.off("tap");
  playfieldSwiper.off("swipeleft");
  playfieldSwiper.off("swiperight");

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

export const restartGameDom = () => {
  clearPlayfieldDiv();
  stopFallingTetramino();

  tetris = new Tetris();
  startGameDom();
};

export const startGameDom = () => {
  const playfieldDiv = createPlayfield();
  playfieldSwiper = new Hammer(playfieldDiv);
  const additionalDiv = createAdditionalInfoDiv();
  const logo = document.getElementById("logo");

  logo.remove();
  gameDiv.innerHTML = "";
  gameDiv.appendChild(playfieldDiv);
  gameDiv.appendChild(additionalDiv);
  gameDiv.classList.add("running-game");

  clearPlayfieldDiv();

  window.addEventListener("keydown", keydownHandler);

  playfieldSwiper.on("tap", () => {
    tetris.rotateTetramino();
  });

  playfieldSwiper.on("swipeleft", () => {
    tetris.moveTetraminoLeft();
  });

  playfieldSwiper.on("swiperight", () => {
    tetris.moveTetraminoRight();
  });

  startFallingTetramino();
};

export const stopGameDom = () => {
  drawFigureOnPlayfield(SAD_SMILE_INDEX);
  toggleEndGameAnimation();
  setTimeout(toggleEndGameAnimation, 1000);

  stopFallingTetramino();
};
