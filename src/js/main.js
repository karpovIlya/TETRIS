import "../css/style.css";
import { createPlayfield, getGameDiv, deleteLogo } from "./domUtils.js";

document.getElementById("start-btn").addEventListener("click", () => {
  const gameDiv = getGameDiv();
  const playfieldDiv = createPlayfield();

  deleteLogo();
  gameDiv.innerHTML = "";
  gameDiv.appendChild(playfieldDiv);
});
