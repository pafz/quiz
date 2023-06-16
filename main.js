//después añadir desde DOM class='hide' donde sea necesario
const h1 = document.createElement("h1");
h1.innerText = "Welcome to the Quiz";
document.body.appendChild(h1);

const divContainer = document.createElement("div");
document.body.appendChild(divContainer);

const divQuestions = document.createElement("div");
divQuestions.classList = "hide";
divContainer.appendChild(divQuestions);

const btnQuestions = document.createElement("button");
divContainer.appendChild(btnQuestions);

const btn = document.createElement("button");
btn.innerText = "Start the game";
document.body.appendChild(btn);
let apiContent = "";

//i question
let currentQuestionIndex;

const startGame = (e) => {
  e.preventDefault();
  console.log("hi");
  currentQuestionIndex = 0;
  startApi();
};

//print all questions IGNORE
const printAllQuestions = () => {
  setTimeout(() => {
    allTheQuiz.forEach((question) => {
      //console.log(question.question);
    });
  }, 1000);
};

//sofi
/*
function showQuestionSofi(question) {
  console.log(question);
  //divQuestions.innerHTML = console.log(correct_answers);
  correct_answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if (correct_answer) {
      button.dataset.correct = true;
    }

    answerButtonsElement.appendChild(button);
  });
}*/

//show answer FIXME: imprimir botones con respuesta correcta e incorrecta y hacerla random
const showQuestion = () => {
  //questionElement.innerText = question.question;
  allTheQuiz.forEach((incorrect_answers) => {
    const btnQuestions = document.createElement("button");
    btnQuestions.innerText = incorrect_answers;
    divContainer.appendChild(btnQuestions);
    console.log("entra en showQuestions");

    if (incorrect_answers) {
      button.dataset.correct = true;
    }

    answerButtonsElement.appendChild(button);
  });
};

//create to print DOM TODO: aparezca de 1 en 1 +=
const printDOM = () => {
  setTimeout(() => {
    allTheQuiz.forEach((question) => {
      //inner DOM
      divQuestions.innerHTML += `<p>${question.question}</p>`;
    });
  }, 1000);
  console.log("introDOM");
  showQuestion();
};

//API
let allTheQuiz = [];
const startApi = () => {
  axios
    .get(
      "https://opentdb.com/api.php?amount=10&category=25&type=multiple&encode=url3986"
    )
    .then((res) => {
      allTheQuiz = res.data.results;
      console.log(allTheQuiz);
    })
    .catch((err) => console.error(err));
  printDOM();
  //showQuestionSofi(allTheQuiz.question);
};

btn.addEventListener("click", startGame);
