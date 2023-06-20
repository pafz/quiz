//TODO:después añadir desde DOM class='hide' donde sea necesario
//TODO:aumentar contador a 9 para probar cuando se lleva a la últma pregunta. Select li button
//TODO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

//FIXED: en localstorage no detecta último acierto score
//borrar lo que está de más y añadir otro user desde id
//añadir paginas SPA

//CAMBIAR LA KEY a ID y luego asignarle nuevos valores ++
const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('answers');

const ulAnswers = document.getElementById('answers');

const btnStart = document.createElement('button');
btnStart.innerText = 'Start the game';
let scores = JSON.parse(localStorage.getItem('scores')) || [];
//btnStart.classList = "hide";
document.body.appendChild(btnStart);

const bntNext = document.createElement('button');
bntNext.innerText = 'Next ->';
bntNext.classList = 'hide';
document.body.appendChild(bntNext);

//i question en realidad es 0
let currentQuestionIndex;
let score;
let playerId = 1;

const startGame = e => {
  e.preventDefault();
  currentQuestionIndex = 0;
  score = 0;
  btnStart.classList.add('hide');
  startApi();
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
  document.getElementById('question-number').innerText =
    currentQuestionIndex + 1;
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
        btnStart.innerText = 'Restart';
        btnStart.classList.remove('hide');
      }
    }, 3000);
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
const update = () => {
  console.log(localStorage.setItem('player', JSON.stringify(score)));
};

const userGuardado = JSON.parse(localStorage.getItem('user')); //no hace falta igualar, se parasea
console.log(userGuardado);

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

btnStart.addEventListener('click', startGame);
