import { COLLUMN_AMOUNT, ROW_AMOUNT } from "./consts.js";

const gameDiv = document.getElementById("game");

export const getGameDiv = () => {
  return gameDiv;
};

export const deleteLogo = () => {
  const logo = document.getElementById("logo");
  logo.remove();
};

export const createPlayfield = () => {
  const playfieldDiv = document.createElement("div");
  playfieldDiv.classList.add("playfield");

  for (let column = 0; column < COLLUMN_AMOUNT; column++) {
    for (let row = 0; row < ROW_AMOUNT; row++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      playfieldDiv.appendChild(cellDiv);
    }
  }

  return playfieldDiv;
};
