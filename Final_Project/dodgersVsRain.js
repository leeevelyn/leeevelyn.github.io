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

  // Build a year -> win_pct lookup from Dodgers data
  // Filter to full seasons only (162 games) to avoid partial years
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

  // Colors for each country's rainfall line
  const rainfallColors = {
    'Djibouti':         'rgba(54, 162, 235, 0.8)',
    'Jordan':           'rgba(255, 99, 132, 0.8)',
    'Solomon Islands':  'rgba(75, 192, 192, 0.8)',
    'Uzbekistan':       'rgba(255, 159, 64, 0.8)',
  };

  countries.forEach((country, i) => {
    // Get this country's rainfall entries, sorted by year
    const countryRain = rainfallData
      .filter(r => r.Entity === country)
      .sort((a, b) => a.Year - b.Year);

    // Only keep years where we also have Dodgers data
    const matched = countryRain.filter(r => dodgersByYear[r.Year] !== undefined);

    const labels      = matched.map(r => r.Year);
    const rainValues  = matched.map(r => r['Annual precipitation']);
    const winValues   = matched.map(r => dodgersByYear[r.Year]);

    const ctx = document.getElementById(chartIds[i]).getContext('2d');

    new Chart(ctx, {
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
          },
          {
            label: 'Dodgers Wins',
            data: winValues,
            borderColor: 'rgba(0, 90, 156, 0.9)',  // Dodger blue
            backgroundColor: 'rgba(0, 90, 156, 0.05)',
            tension: 0.3,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',      // tooltip shows both values at once on hover
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: `Dodgers Wins vs ${country} Annual Rainfall (1958–2025)`,
          },
          legend: { position: 'top' },
        },
        scales: {
            x: {
              title: { display: true, text: 'Year' },
            },
            y: {
              title: { display: true, text: 'Value' },
            },

        },
      },
    });
  });
}