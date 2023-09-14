import { splashScreen } from "./temlates";
import { show, hide, createLoading, destroyLoading } from "./helpers";

// queries
const startGamePage = document.querySelector(".start-game"),
  startGameControl = document.getElementById("start"),
  quizPage = document.querySelector(".quiz-page"),
  pointsHistoryPage = document.querySelector(".point-history"),
  pointsHistoryControl = document.getElementById("points-history"),
  pointsBackControl = document.getElementById("points-back"),
  closeQuizControl = document.getElementById("close-quiz");

// Load Splash Screen when load page
function loadSplashScreen() {
  document.body.insertAdjacentHTML("afterbegin", splashScreen);
  let ss = document.querySelector(".splash-screen");

  ss.classList.add("show");

  setTimeout(() => {
    ss.classList.remove("show");
    setTimeout(() => {
      ss.remove();
    }, 1000);
  }, 100);
}

// Load Page
function loadDoc() {
  loadSplashScreen();
}

// Open Quiz Page when Click The Start Game Control
function openQuizPage() {
  hide(startGamePage);
  show(quizPage, "block");
}

// Open Points History when Click The point history Control
function openPointsHistory() {
  console.log(this);
  hide(startGamePage);
  show(pointsHistoryPage, "grid");
}

// back to prev
function back() {
  hide(this.parentElement.parentElement);
  show(startGamePage, "grid");
}

// Event
window.addEventListener("load", loadDoc);
startGameControl.addEventListener("click", openQuizPage);
pointsHistoryControl.addEventListener("click", openPointsHistory);
pointsBackControl.addEventListener("click", back);
closeQuizControl.addEventListener("click", back);
