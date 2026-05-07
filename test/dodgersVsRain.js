async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

export default async function buildRainfallCharts() {
  const [rainfallData, dodgersData] = await Promise.all([
    loadJSON('./rainfall.json'),
    loadJSON('./dodgers_season_outcomes.json'),
  ]);

  const dodgersByYear = {};
  for (const season of dodgersData) {
    if (season.games >= 1) { 
      dodgersByYear[season.year] = season.wins;
    }
  }

  const countries = [ 'Jordan', 'Djibouti', 'Uzbekistan', 'Solomon Islands'];
  const chartIds = [
    'rainfall-chart1',
    'rainfall-chart2',
    'rainfall-chart3',
    'rainfall-chart4',
  ];

  const rainfallColors = {
    'Djibouti':         'rgba(54, 162, 235, 0.8)',
    'Jordan':           'rgba(255, 99, 132, 0.8)',
    'Solomon Islands':  'rgba(75, 192, 192, 0.8)',
    'Uzbekistan':       'rgba(255, 159, 64, 0.8)',
  };

  countries.forEach((country, i) => {
    const countryRain = rainfallData
      .filter(r => r.Entity === country)
      .sort((a, b) => a.Year - b.Year);

    const matched = countryRain.filter(r => dodgersByYear[r.Year] !== undefined);

    const labels     = matched.map(r => r.Year);
    const rainValues = matched.map(r => r['Annual precipitation']);
    const winValues  = matched.map(r => dodgersByYear[r.Year]);

    const ctx = document.getElementById(chartIds[i]).getContext('2d');

    let dualAxis = false;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${country} Rainfall (mm)`,
            data: rainValues,
            borderColor: rainfallColors[country],
            backgroundColor: rainfallColors[country].replace('0.8', '0.1'),
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y',
          },
          {
            label: 'Dodgers Wins',
            data: winValues,
            borderColor: 'rgba(0, 90, 156, 0.9)',
            backgroundColor: 'rgba(0, 90, 156, 0.05)',
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          title: {
            display: true,
            text: `Dodgers Wins vs ${country} Annual Rainfall (1958–2025)`,
          },
          legend: { position: 'top' },
        },
        scales: {
          x: { title: { display: true, text: 'Year' } },
          y: { title: { display: true, text: 'Value' } },
        },
      },
    });

    if (i === 3) {
      document.getElementById('toggle-solomon-islands').addEventListener('click', function () {
        dualAxis = !dualAxis;
        this.textContent = dualAxis ? 'Switch View' : 'Switch View';

        chart.data.datasets[0].yAxisID = dualAxis ? 'yRain' : 'y';
        chart.data.datasets[1].yAxisID = dualAxis ? 'yWin' : 'y';

        chart.options.scales = dualAxis
          ? {
              x: { title: { display: true, text: 'Year' } },
              yRain: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Rainfall (mm)' },
                grid: { drawOnChartArea: false },
              },
              yWin: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Dodgers Wins' },
                min: 50,
                max: 120,
              },
            }
          : {
              x: { title: { display: true, text: 'Year' } },
              y: { title: { display: true, text: 'Value' } },
            };

        chart.update();
      });
    }
  });
}