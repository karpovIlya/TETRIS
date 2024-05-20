import "../css/style.css";
import { startGameDom } from "./domUtils.js";

document.getElementById("start-btn").addEventListener("click", () => {
  startGameDom();
});

window.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      startGameDom();
    }
  },
  { once: true }
);
