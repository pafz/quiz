//TODO:aumentar contador a 9 para probar cuando se lleva a la últma pregunta. Select li button
//TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

//TODO: get localstorage and print graphics
//borrar lo que está de más y añadir otro user desde id

//CAMBIAR LA KEY a ID y luego asignarle nuevos valores ++
const questionContainer = document.getElementById('question');
const questionNumber = document.getElementById('question-number');
const answerContainer = document.getElementById('answers');

const ulAnswers = document.getElementById('answers');

let scores = JSON.parse(localStorage.getItem('scores')) || [];
//btnStart.classList = "hide";

//localstorage - get
const scoreSaved = JSON.parse(localStorage.getItem('scores')); //no hace falta igualar, se parasea
console.log(scoreSaved);

const bntNext = document.createElement('button');
bntNext.innerText = 'Next ->';
bntNext.classList = 'hide';
document.body.appendChild(bntNext);

const divGraphics = document.getElementById('graphics');

const h1 = document.getElementById('h1');
const h3 = document.getElementById('h3');

//i question en realidad es 0
let currentQuestionIndex;
let score;
let playerId = 1;

const startGame = e => {
  e.preventDefault();
  currentQuestionIndex = 0;
  score = 0;
  questionContainer.innerText = '';
  questionNumber.innerText = '';
  ulAnswers.innerHTML = '';
  startApi();
  navigate('quiz');
};

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
  questionNumber.innerText = currentQuestionIndex + 1;
  questionContainer.innerText = sanitizeText(questionAndAnswers.question);
  ulAnswers.innerHTML = '';
  let allAnswers = [];
  allAnswers.push(questionAndAnswers.correct_answer);
  allAnswers = allAnswers.concat(questionAndAnswers.incorrect_answers);

  allAnswers = allAnswers.sort(() => (Math.random() > 0.5 ? 1 : -1));

  const checkAnswer = (apiData, answer, btn) => {
    const correctAnswer =
      answer === apiData[currentQuestionIndex].correct_answer;
    if (correctAnswer) {
      score += 1;
      document.getElementById('score').innerText = score;
      btn.style.color = 'green';
    } else {
      btn.style.color = 'red';
    }

    document
      .querySelectorAll('li button')
      .forEach(button => button.setAttribute('disabled', '')); //también acceder button.disable = true;

    setTimeout(() => {
      if (apiData.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        printQuestion(apiData);
      } else {
        //LOCALSTORAGE del score: cuando haga reset, crear otro score
        scores.push(score);
        localStorage.setItem(`scores`, JSON.stringify(scores));
        //localstorage - get
        const scoreSaved = JSON.parse(localStorage.getItem('scores')); //no hace falta igualar, se parasea
        console.log(scoreSaved);
        navigate('results');
      }
    }, 30);
  };

  for (let answer of allAnswers) {
    const li = document.createElement('li');
    ulAnswers.appendChild(li);

    const btnAnswer = document.createElement('button');
    btnAnswer.innerText = sanitizeText(answer);
    li.appendChild(btnAnswer);

    btnAnswer.addEventListener('click', () => {
      checkAnswer(apiData, answer, btnAnswer);
    });
  }
};

//localstorage - update
const update = () =>
  console.log(localStorage.setItem('player', JSON.stringify(score)));
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
    `player_id`;
    //`player_id${playerId++}`;
    const items = { ...localStorage };
  }
};

//SPA:
const navigate = containerId => {
  const welcome = document.getElementById('welcome');
  const quiz = document.getElementById('quiz');
  const results = document.getElementById('results');

  switch (containerId) {
    case 'welcome':
      welcome.classList.remove('hide');
      quiz.classList.add('hide');
      results.classList.add('hide');
      break;
    case 'quiz':
      welcome.classList.add('hide');
      quiz.classList.remove('hide');
      results.classList.add('hide');
      break;
    case 'results':
      welcome.classList.add('hide');
      quiz.classList.add('hide');
      results.classList.remove('hide');
      break;
  }
};

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', startGame);
document.getElementById('home').addEventListener('click', () => {
  navigate('welcome');
});
