const homersVsPres2 = document.getElementById("shohei-chart2")

new Chart(homersVsPres2, {
  type: 'bar',
  data: {
    labels: ["Trump", "Biden"],
    datasets: [{
      label: 'Homers',
      data: [113, 181],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
export default homersVsPres2;