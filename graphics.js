//GRAPHICS
let labels = [];
let dataInfo = [];
for (const index of scoreSaved) {
  console.log(index);
}

for (let i = 0; i <= scoreSaved.length; i++) {
  labels.push(i);
}
console.log(labels.length);
console.log(scoreSaved);
const data = {
  labels: labels,
  datasets: [
    {
      label: 'scores',
      backgroundColor: 'rgb(25, 9, 142)',
      borderColor: 'rgb(255, 99, 132)',
      data: scoreSaved,
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {},
};

const myChart = new Chart('myChart', config);
