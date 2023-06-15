//quiza añadir desde DOM class='hide'
const div = document.createElement("div");
document.body.appendChild(div);

const h1 = document.createElement("h1");
h1.innerText = "Welcome to the Quiz";
document.body.appendChild(h1);

const btn = document.createElement("button");
btn.innerText = "Start the game";
document.body.appendChild(btn);
let apiContent = "";

const startGame = (e) => {
  e.preventDefault();
  console.log("hi");
  startApi();
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
  printAllQuestions();
};
console.log(allTheQuiz);

//print all questions
const printAllQuestions = () => {
  setTimeout(() => {
    allTheQuiz.forEach((question) => {
      console.log(question.question);
    });
  }, 1000);
};

//API example
let arr = [
  {
    category: "Art",
    type: "multiple",
    difficulty: "easy",
    question: "Who%20paint",
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "easy",
    question: "Who%20paint",
  },
];

//console.log(arr[0].category);
arr.forEach((element) => {
  console.log(element.question);
});

btn.addEventListener("click", startGame);
