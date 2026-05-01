new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Trump", "Trump", "Trump", "Biden", "Biden", "Biden", "Biden", "Trump"],
      datasets: [{
        label: 'Homers',
        data: [22, 18, 7, 46, 34, 44, 57, 66],
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

  