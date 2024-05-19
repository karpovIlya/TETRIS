import "../css/style.css";
import { startGame } from "./domUtils.js";

document.getElementById("start-btn").addEventListener("click", () => {
  startGame();
});
