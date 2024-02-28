import formatData from "./functions.js";

const wrapper = document.getElementById("wrapper");
const spinner = document.getElementById("spinner");
const questionText = document.getElementById("question-text");
const answerText = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const questionNumber = document.getElementById("question-number");
const warningText = document.getElementById("warning-text");

const level = localStorage.getItem("level") || "medium";
const SCORE_UNIT = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isClickable = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (error) {
    spinner.style.display = "none";
    warningText.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  spinner.style.display = "none";
  warningText.style.display = "none";
  wrapper.style.display = "block";
};
const showQuestion = () => {
  //destructure data
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } = formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerText.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isClickable) return;
  isClickable = false;

  if (index == correctAnswer) {
    event.target.classList.add("correct-answer");
    score += SCORE_UNIT;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("wrong-answer");
    answerText[correctAnswer].classList.add("correct-answer");
  }
};

const nextQuestion = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isClickable = true;
    removeClasses();
    showQuestion();
  } else {
    finishGame();
  }
};

const finishGame = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

const removeClasses = () => {
  answerText.forEach((button) => {
    button.classList = "answer-text btn";
  });
};
window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextQuestion);
finishButton.addEventListener("click", finishGame);

answerText.forEach((button, index) => {
  // const handlerCheckAnswer = () => checkAnswer(index);
  // button.addEventListener("click",() => checkAnswer(index))
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
