//quiza añadir desde DOM class='hide'
const div = document.createElement("div");
document.body.appendChild(div);

const h1 = document.createElement("h1");
h1.innerText = "Welcome to the Quiz";
document.body.appendChild(h1);

const btn = document.createElement("button");
btn.innerText = "Start the game";
document.body.appendChild(btn);

const startGame = (e) => {
  e.preventDefault();
  console.log("hi");
};

btn.addEventListener("click", startGame);
