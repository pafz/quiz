//TODO:después añadir desde DOM class='hide' donde sea necesario
//TODO:aumentar contador a 9 para probar cuando se lleva a la últma pregunta. Select li button
//TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('answers');

const ulAnswers = document.getElementById('answers');

const btnStart = document.createElement('button');
btnStart.innerText = 'Start the game';

//btnStart.classList = "hide";
document.body.appendChild(btnStart);

const bntNext = document.createElement('button');
bntNext.innerText = 'Next ->';
bntNext.classList = 'hide';
document.body.appendChild(bntNext);

//i question en realidad es 0
let currentQuestionIndex;

const startGame = e => {
  e.preventDefault();
  currentQuestionIndex = 0;
  btnStart.classList.add('hide');
  startApi();
};

let score = 0;
let playerId = 1;

//API
const startApi = () => {
  axios
    .get(
      'https://opentdb.com/api.php?amount=10&category=25&type=multiple&encode=url3986'
    )
    .then(res => {
      const apiData = res.data.results;
      console.log(apiData);
      printQuestion(apiData);
    })
    .catch(err => console.error(err));
};

const sanitizeText = text => decodeURI(text).replaceAll('%3F', '?'); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

/////print a Question & Answers
const printQuestion = apiData => {
  const questionAndAnswers = apiData[currentQuestionIndex];
  questionContainer.innerText = sanitizeText(questionAndAnswers.question);

  ulAnswers.innerHTML = '';
  //correct_answer:
  const liAnswer = document.createElement('li');
  ulAnswers.appendChild(liAnswer);

  const btnAnswer = document.createElement('button');
  btnAnswer.innerText = sanitizeText(questionAndAnswers.correct_answer);
  liAnswer.appendChild(btnAnswer);
  btnAnswer.addEventListener('click', () => {
    btnAnswer.style.color = 'green';
    btnAnswer.disabled = true;
    document
      .querySelectorAll('li button')
      .forEach(button => button.setAttribute('disabled', ''));
    score += 1;
    document.getElementById('score').innerText = score;

    setTimeout(() => {
      currentQuestionIndex++;
      if (apiData.length > currentQuestionIndex + 1) {
        printQuestion(apiData);
      } else {
        btnStart.innerText = 'Restart';
        btnStart.classList.remove('hide');
      }
    }, 3000);
  });

  //incorrect_answers:
  for (let incorrect_answer of questionAndAnswers.incorrect_answers) {
    const liAnswerIncorrect = document.createElement('li');
    ulAnswers.appendChild(liAnswerIncorrect);

    const btnAnswerIncorrect = document.createElement('button');
    btnAnswerIncorrect.innerText = sanitizeText(incorrect_answer);
    liAnswerIncorrect.appendChild(btnAnswerIncorrect);

    btnAnswerIncorrect.addEventListener('click', () => {
      btnAnswerIncorrect.style.color = 'red';
      document
        .querySelectorAll('li button')
        .forEach(button => button.setAttribute('disabled', ''));
      setTimeout(() => {
        currentQuestionIndex++;
        if (apiData.length > currentQuestionIndex + 1) {
          printQuestion(apiData);
        } else {
          btnStart.innerText = 'Restart';
          btnStart.classList.remove('hide');
        }
      }, 3000);
    });
  }
  //LOCALSTORAGE del score: cuando haga reset, crear otro score
  const playerX = localStorage.setItem(
    `player_id${playerId}`,
    JSON.stringify(score)
  );
};
//AQUI
let players = JSON.parse(localStorage.getItem('itemsArray'));

//
const selectAnswer = () => {
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    `player_id${playerId++}`;
    const items = { ...localStorage };
  }
};

btnStart.addEventListener('click', startGame);
