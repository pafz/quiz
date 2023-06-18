//TODO:después añadir desde DOM class='hide' donde sea necesario
//TODO:aumentar contador a 9 para probar cuando se lleva a la últma pregunta
const questionContainer = document.getElementById("question");
const answerContainer = document.getElementById("answers");

const ulAnswers = document.getElementById("answers");

const btnStart = document.createElement("button");
btnStart.innerText = "Start the game";
//btnStart.classList = "hide";
document.body.appendChild(btnStart);

const bntNext = document.createElement("button");
bntNext.innerText = "Next ->";
bntNext.classList = "hide";
document.body.appendChild(bntNext);

//i question
let currentQuestionIndex = 0;

const startGame = (e) => {
  e.preventDefault();
  startApi();
};

let score = 0;
//API
const startApi = () => {
  axios
    .get(
      "https://opentdb.com/api.php?amount=10&category=25&type=multiple&encode=url3986"
    )
    .then((res) => {
      const apiData = res.data.results;
      console.log(apiData);
      printQuestion(apiData);
    })
    .catch((err) => console.error(err));
};

const sanitizeText = (text) => decodeURI(text).replaceAll("%3F", "?"); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

/////print a Question & Answers
const printQuestion = (apiData) => {
  const questionAndAnswers = apiData[currentQuestionIndex];
  questionContainer.innerText = sanitizeText(questionAndAnswers.question);

  ulAnswers.innerHTML = "";
  //correct_answer:
  const liAnswer = document.createElement("li");
  ulAnswers.appendChild(liAnswer);

  const btnAnswer = document.createElement("button");
  btnAnswer.innerText = sanitizeText(questionAndAnswers.correct_answer);
  liAnswer.appendChild(btnAnswer);
  btnAnswer.addEventListener("click", () => {
    btnAnswer.style.color = "green";
    btnAnswer.disabled = true;
    document
      .querySelectorAll("li button")
      .forEach((button) => button.setAttribute("disabled", ""));
    score += 1;
    document.getElementById("score").innerText = score;

    setTimeout(() => {
      currentQuestionIndex++;
      printQuestion(apiData);
    }, 3000);
  });

  //incorrect_answers:
  for (let incorrect_answer of questionAndAnswers.incorrect_answers) {
    const liAnswerIncorrect = document.createElement("li");
    ulAnswers.appendChild(liAnswerIncorrect);

    const btnAnswerIncorrect = document.createElement("button");
    btnAnswerIncorrect.innerText = sanitizeText(incorrect_answer);
    liAnswerIncorrect.appendChild(btnAnswerIncorrect);

    btnAnswerIncorrect.addEventListener("click", () => {
      btnAnswerIncorrect.style.color = "red";
      document
        .querySelectorAll("li button")
        .forEach((button) => button.setAttribute("disabled", ""));
      setTimeout(() => {
        currentQuestionIndex++;
        printQuestion(apiData);
      }, 3000);
    });
  }
};

btnStart.addEventListener("click", startGame);
