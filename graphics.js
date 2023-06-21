//GRAPHICS
let labels = [];
let dataInfo = [];

for (let i = 0; i <= scoreSaved.length; i++) {
  labels.push(i);
}

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
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
};

const myChart = new Chart('myChart', config);
//https://www.chartjs.org/docs/latest/configuration/animations.html#looping-tension-[property]
