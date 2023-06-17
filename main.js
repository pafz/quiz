//después añadir desde DOM class='hide' donde sea necesario

const divContainer = document.createElement("div");
document.body.appendChild(divContainer);

const divQuestions = document.getElementById("question");
const answerContainer = document.getElementById("answers");

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
  divQuestions.innerText = sanitizeText(questionAndAnswers.question);
  console.log(question);

  //correct_answer:
  const liAnswer = document.createElement("li");
  divQuestions.appendChild(liAnswer);

  const btnAnswer = document.createElement("button");
  btnAnswer.innerText = sanitizeText(questionAndAnswers.correct_answer);
  liAnswer.appendChild(btnAnswer);
  btnAnswer.addEventListener("click", () => {
    btnAnswer.style.color = "green";
    document.querySelectorAll("li");
  });

  //incorrect_answers:
  for (let incorrect_answer of questionAndAnswers.incorrect_answers) {
    const liAnswerIncorrect = document.createElement("li");
    divQuestions.appendChild(liAnswerIncorrect);

    const btnAnswerIncorrect = document.createElement("button");
    btnAnswerIncorrect.innerText = sanitizeText(incorrect_answer);
    liAnswerIncorrect.appendChild(btnAnswerIncorrect);

    btnAnswerIncorrect.addEventListener("click", () => {
      btnAnswerIncorrect.style.color = "red";
    });
  }
};

btnStart.addEventListener("click", startGame);
