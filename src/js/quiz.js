import { show, hide, createLoading, destroyLoading } from "./helpers";

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
  quizTimeText = document.querySelector(".time-text"),
  finalScorePage = document.querySelector(".final-score"),
  inputName = document.querySelector(".input-text"),
  saveScoreControl = document.getElementById("save-score");

let allScore = 0,
  quizScores = [];

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

// Start Quiz Game
let difficultySelected = Array.from(difficultyItems).find(
  (item) => item.checked
);
let quizData = {
  difficulty: difficultySelected.dataset.control,
};

let questions = null;

let questionIndex = 0;

async function startGame() {
  if (quizPage.classList.contains("visible")) {
    // Fetch Questions
    try {
      createLoading(quizPage);
      let res = await fetch("https://opentdb.com/api.php?amount=10"),
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

  let correct = Array.from(quizAnswersParent.children).find(
    (item) => item.innerHTML === questions[index].correct_answer
  );
  Array.from(quizAnswersParent.children).forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.currentTarget.innerText !== questions[index].correct_answer) {
        e.currentTarget.classList.add("wrang");
        correct.classList.add("success");
        correct.setAttribute("data-success", 0);
      } else {
        correct.classList.add("success");
        correct.setAttribute("data-success", 1);
      }
    });
  });
}

function nextQuestion() {
  let correct = Array.from(quizAnswersParent.children).find(
    (answer) => answer.dataset.success
  );
  quizScores.push(+correct.dataset.success);

  questionIndex++;

  if (questionIndex + 1 >= questions.length) {
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

  alert("Score Saved!");
}

// Event
startGameControl.addEventListener("click", openQuizPage);
pointsHistoryControl.addEventListener("click", openPointsHistory);
pointsBackControl.addEventListener("click", back);
closeQuizControl.addEventListener("click", back);
startGameControl.addEventListener("click", startGame);
quizNextQuestion.addEventListener("click", nextQuestion);
saveScoreControl.addEventListener("click", saveScore);
