/* ================================
   QUIZ MASTER - ADVANCED VERSION
================================ */

/* QUESTIONS */

const questions = [

  {
    question: "Which language is known as the language of the web?",
    options: [
      "Python",
      "JavaScript",
      "C++",
      "Java"
    ],
    answer: 1
  },

  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax"
    ],
    answer: 2
  },

  {
    question: "Which HTML tag is used for JavaScript?",
    options: [
      "<js>",
      "<script>",
      "<javascript>",
      "<code>"
    ],
    answer: 1
  },

  {
    question: "Which company developed Java?",
    options: [
      "Apple",
      "Sun Microsystems",
      "Google",
      "Microsoft"
    ],
    answer: 1
  },

  {
    question: "Which CSS property changes background color?",
    options: [
      "bg-color",
      "background",
      "background-color",
      "color"
    ],
    answer: 2
  }

];


/* VARIABLES */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let timer;
let timeLeft = 15;


/* DOM ELEMENTS */

const questionEl =
  document.getElementById("question");

const optionsEl =
  document.getElementById("options");

const nextBtn =
  document.getElementById("nextBtn");

const progressBar =
  document.getElementById("progressBar");

const timeEl =
  document.getElementById("time");

const quizBox =
  document.getElementById("quizBox");


/* LOAD QUESTION */

function loadQuestion() {

  resetTimer();

  const currentQuiz =
    questions[currentQuestion];

  questionEl.innerText =
    currentQuiz.question;

  optionsEl.innerHTML = "";

  selectedAnswer = null;

  currentQuiz.options.forEach((option, index) => {

    const optionDiv =
      document.createElement("div");

    optionDiv.classList.add("option");

    optionDiv.innerHTML = `
    
      <span class="option-letter">
        ${String.fromCharCode(65 + index)}
      </span>

      <span class="option-text">
        ${option}
      </span>

    `;

    optionDiv.addEventListener("click", () => {

      document
        .querySelectorAll(".option")
        .forEach(opt => {
          opt.classList.remove("selected");
        });

      optionDiv.classList.add("selected");

      selectedAnswer = index;
    });

    optionsEl.appendChild(optionDiv);

  });

  nextBtn.innerText =
    currentQuestion === questions.length - 1
      ? "Submit Quiz"
      : "Next Question";

  updateProgress();

}


/* UPDATE PROGRESS */

function updateProgress() {

  const progress =
    ((currentQuestion) / questions.length) * 100;

  progressBar.style.width =
    `${progress}%`;

}


/* TIMER */

function startTimer() {

  timer = setInterval(() => {

    timeLeft--;

    timeEl.innerText = timeLeft;

    /* TIMER COLORS */

    if (timeLeft <= 5) {
      timeEl.style.color = "#ff4d4d";
    }

    else {
      timeEl.style.color = "#ffffff";
    }

    /* AUTO NEXT */

    if (timeLeft <= 0) {

      clearInterval(timer);

      currentQuestion++;

      if (currentQuestion < questions.length) {

        animateQuiz();

        loadQuestion();

      }

      else {

        showResult();

      }

    }

  }, 1000);

}


/* RESET TIMER */

function resetTimer() {

  clearInterval(timer);

  timeLeft = 15;

  timeEl.innerText = timeLeft;

  startTimer();

}


/* BUTTON EVENT */

nextBtn.addEventListener("click", () => {

  if (selectedAnswer === null) {

    shakeButton();

    return;

  }

  checkAnswer();

});


/* CHECK ANSWER */

function checkAnswer() {

  clearInterval(timer);

  const correctAnswer =
    questions[currentQuestion].answer;

  const options =
    document.querySelectorAll(".option");

  /* SHOW CORRECT & WRONG */

  options.forEach((option, index) => {

    if (index === correctAnswer) {
      option.classList.add("correct");
    }

    else if (
      index === selectedAnswer &&
      selectedAnswer !== correctAnswer
    ) {
      option.classList.add("wrong");
    }

  });

  /* SCORE */

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  /* NEXT QUESTION */

  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

      animateQuiz();

      loadQuestion();

    }

    else {

      showResult();

    }

  }, 1200);

}


/* SHOW RESULT */

function showResult() {

  clearInterval(timer);

  progressBar.style.width = "100%";

  let message = "";

  let emoji = "";

  let percentage =
    (score / questions.length) * 100;

  if (percentage === 100) {

    message = "Perfect Score";
    emoji = "🏆";

  }

  else if (percentage >= 70) {

    message = "Excellent Work";
    emoji = "🔥";

  }

  else if (percentage >= 40) {

    message = "Good Attempt";
    emoji = "🚀";

  }

  else {

    message = "Keep Practicing";
    emoji = "💡";

  }

  quizBox.innerHTML = `

    <div class="result-box fade">

      <div class="result-emoji">
        ${emoji}
      </div>

      <h2>${message}</h2>

      <p class="score-text">
        Your Score
      </p>

      <div class="final-score">
        ${score} / ${questions.length}
      </div>

      <button onclick="restartQuiz()">
        Restart Quiz
      </button>

    </div>

  `;

}


/* RESTART QUIZ */

function restartQuiz() {

  location.reload();

}


/* QUIZ ANIMATION */

function animateQuiz() {

  quizBox.classList.remove("fade");

  void quizBox.offsetWidth;

  quizBox.classList.add("fade");

}


/* SHAKE BUTTON */

function shakeButton() {

  nextBtn.classList.add("shake");

  setTimeout(() => {
    nextBtn.classList.remove("shake");
  }, 500);

}


/* START QUIZ */

loadQuestion();