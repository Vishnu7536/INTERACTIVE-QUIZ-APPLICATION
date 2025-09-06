const questions = [
  { question: "What does HTML stand for?", answers: [
    
    { text: "Home Tool Markup Language", correct: false },
    { text: "Hyperlinks and Text Markup Language", correct: false },
    { text: "Hyper Tool Multi Language", correct: false },
    { text: "Hyper Text Markup Language", correct: true }
  ]},
  { question: "Which tag is used to create a hyperlink in HTML?", answers: [
   
    { text: "<link>", correct: false },
    { text: "<href>", correct: false },
     { text: "<a>", correct: true },
    { text: "<url>", correct: false }
  ]},
  { question: "Which tag is used to display an image?", answers: [
    { text: "<img>", correct: true },
    { text: "<src>", correct: false },
    { text: "<image>", correct: false },
    { text: "<pic>", correct: false }
  ]},
  { question: "Which attribute is used to provide an image source?", answers: [

    { text: "href", correct: false },
    { text: "link", correct: false },
        { text: "src", correct: true },
    { text: "source", correct: false }
  ]},
  { question: "Which tag is used to define a table row?", answers: [
  
    { text: "<td>", correct: false },
      { text: "<tr>", correct: true },
    { text: "<th>", correct: false },
    { text: "<row>", correct: false }
  ]}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let totalSeconds = 5 * 60; // ⏱ 5-minute timer
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  totalSeconds = 5 * 60;
  nextButton.innerHTML = "Next";
  scoreElement.innerHTML = "";
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    totalSeconds--;
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    timerElement.textContent = `Time: ${mins}:${secs}`;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text; // ✅ safer than innerHTML
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

function showScore() {
  clearInterval(timerInterval);
  resetState();
  questionElement.innerHTML = `🎉 Quiz Completed!<br>Your Score: ${score} / ${questions.length}`;
  progressElement.textContent = "";
  scoreElement.innerHTML = "";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "inline-block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
