import {
  show,
  hide,
  createLoading,
  destroyLoading,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./helpers";

// queries
const startGamePage = document.querySelector(".start-game"),
  startGameControl = document.getElementById("start"),
  quizPage = document.querySelector(".quiz-page"),
  pointsHistoryPage = document.querySelector(".point-history"),
  pointsHistoryControl = document.getElementById("points-history"),
  pointsBackControl = document.getElementById("points-back"),
  closeQuizControl = document.getElementById("close-quiz"),
  difficultyItems = document.querySelectorAll(".difficulty div input"),
  quizQuestion = document.querySelector(".quiz-question"),
  quizAnswersParent = document.querySelector(".quiz-answers"),
  quizNextQuestion = document.querySelector(".quiz-next-question"),
  quizQuestionCount = document.querySelector(".question-count"),
  // quizProgressCount = document.querySelector(".quiz-progress-count .progress"),
  finalScorePage = document.querySelector(".final-score"),
  inputName = document.querySelector(".input-text"),
  saveScoreControl = document.getElementById("save-score"),
  playAgainControl = document.getElementById("play-again"),
  finalGameBackControl = document.getElementById("final-back"),
  pointsHistoryParent = document.querySelector(".point-history .players"),
  sumScoreElem = document.querySelector(".alsc");

let allScore = 0,
  quizScores = [],
  questionsAmount = 10;

// Open Quiz Page when Click The Start Game Control
function openQuizPage() {
  hide(startGamePage);
  show(quizPage, "block");
}

// Open Points History when Click The point history Control
function openPointsHistory() {
  hide(startGamePage);
  show(pointsHistoryPage, "grid");
}

// back to prev
function back() {
  allScore = 0;
  quizScores = [];
  questionIndex = 0;
  hide(this.parentElement.parentElement);
  show(startGamePage, "grid");
}

// Start Quiz Game
let difficultySelected = Array.from(difficultyItems).find(
  (item) => item.checked
);
let quizData = {
  difficulty: difficultySelected.dataset.control,
};

let questions = null;

let questionIndex = 0;

function initStorage() {
  if (!localStorage.getItem("scores")) {
    localStorage.setItem("scores", JSON.stringify([]));
  }
}

initStorage();

async function startGame() {
  if (quizPage.classList.contains("visible")) {
    // Fetch Questions
    try {
      createLoading(quizPage);
      let res = await fetch(
          `https://opentdb.com/api.php?amount=${questionsAmount}`
        ),
        qs = await res.json();

      questions = qs.results;

      destroyLoading(quizPage);
    } catch (err) {
      destroyLoading(quizPage);
      console.log(err);
    }
    // Genetate First Question
    generateQuestion(questions, questionIndex);
  }
}

function generateRandomIndices(number) {
  const numbers = [];
  for (let i = 0; i < number; i++) {
    numbers.push(i);
  }

  numbers.sort(() => Math.random() - 0.5);

  return numbers;
}

function generateQuestion(questions, index = 0) {
  const targetQuestion = questions[index];

  const answers = [
    ...questions[index].incorrect_answers,
    questions[index].correct_answer,
  ];

  quizAnswersParent.innerHTML = "";

  quizQuestion.innerHTML = targetQuestion.question;
  generateRandomIndices(answers.length).forEach((item, index) => {
    let btnAnswer = document.createElement("button");
    btnAnswer.innerHTML = answers[item];
    quizAnswersParent.append(btnAnswer);
  });

  // Question Count
  questionCount(questionsAmount, index, quizQuestionCount);

  let correct = Array.from(quizAnswersParent.children).find(
    (item) =>
      item.innerHTML.toString().trim() ===
      `${questions[index].correct_answer.toString().trim()}`
  );
  Array.from(quizAnswersParent.children).forEach((item) => {
    item.addEventListener("click", (e) => {
      if (
        e.currentTarget.innerText.toString().trim() !=
        `${questions[index].correct_answer.toString().trim()}`
      ) {
        e.currentTarget.classList.add("wrang");
        correct.classList.add("success");
        correct.setAttribute("data-success", 0);
      } else {
        correct.classList.add("success");
        correct.setAttribute("data-success", 1);
      }

      setTimeout(() => {
        nextQuestion();
      }, 500);
    });
  });
}

function nextQuestion() {
  let correct = Array.from(quizAnswersParent.children).find(
    (answer) => answer.dataset.success
  );
  if (!correct) {
    quizScores.push(0);
  } else {
    quizScores.push(+correct.dataset.success);
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    allScore = quizScores.filter((s) => s == 1).length * 8;

    score.innerHTML = allScore;
    hide(quizPage);
    show(finalScorePage, "grid");
    return;
  }
  generateQuestion(questions, questionIndex);
}

function saveScore() {
  if (!inputName.value) {
    alert("Please Enter Your Name");
    return;
  }
  let scores = getFromLocalStorage("scores");

  scores.push({ score: allScore, name: inputName.value });
  saveToLocalStorage("scores", scores);
  calcSavedScores(sumScoreElem);
  alert("Score Saved!");
}

function playAgain() {
  // Reset All Value Saved
  allScore = 0;
  quizScores = [];
  questionIndex = 0;

  hide(finalScorePage);
  show(quizPage, "grid");
}

function generatePointsHistory() {
  if (pointsHistoryPage.classList.contains("visible")) {
    const scores = getFromLocalStorage("scores");

    // check scores if empty
    if (scores.length <= 0) {
      pointsHistoryParent.insertAdjacentHTML(
        "afterbegin",
        `<div>
      <span>Players Not Found</span>
    </div>`
      );
    }
    scores.forEach((user) => {
      let scoreTemplate = `
      <div>
      <span>${user.name}</span>
      <span>${user.score} Pt</span>
    </div>
    `;

      pointsHistoryParent.insertAdjacentHTML("afterbegin", scoreTemplate);
    });
  }
}

function calcSavedScores(el) {
  const scores = getFromLocalStorage("scores");

  let counter = 0,
    sumScore = 0;
  while (counter < scores.length) {
    sumScore = sumScore + scores[counter].score;

    counter++;
  }

  el.innerHTML = "Score: " + sumScore + " Pt";
}

calcSavedScores(sumScoreElem);

function questionCount(all, current, el) {
  el.innerHTML = `${current + 1} / ${all}`;
}
// Event
startGameControl.addEventListener("click", openQuizPage);
pointsHistoryControl.addEventListener("click", openPointsHistory);
pointsBackControl.addEventListener("click", back);
closeQuizControl.addEventListener("click", back);
startGameControl.addEventListener("click", startGame);
quizNextQuestion.addEventListener("click", nextQuestion);
saveScoreControl.addEventListener("click", saveScore);
playAgainControl.addEventListener("click", playAgain);
playAgainControl.addEventListener("click", startGame);
finalGameBackControl.addEventListener("click", back);
pointsHistoryControl.addEventListener("click", generatePointsHistory);
