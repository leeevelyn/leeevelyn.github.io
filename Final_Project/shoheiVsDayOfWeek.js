import loadData from './load_data.js';

async function buildCharts() {
  // 1. Load both JSON files
  const homers = await loadData();
  const daysResp = await fetch('./dates_days_year.json');
  const daysData = await daysResp.json();

  // 2. Build a lookup map: "2025-03-19" -> "Wednesday"
  //    Note: the key has a trailing space ("day_of_week ") — trim it just in case
  const dateToDayMap = {};
  daysData.forEach(entry => {
    if (!entry.game_date) return; // skip null entries at bottom of your JSON
    const dateKey = entry.game_date; // "2025-03-19T..." -> "2025-03-19"
    const day = entry["day_of_week"]; // handle the trailing space in the key
    dateToDayMap[dateKey] = day;
  });

  // 3. Join: add day_of_week and odd/even to each homer entry
  const enriched = homers.map(homer => {
    const dateKey = homer.game_date;
    const dayOfWeek = dateToDayMap[dateKey] || 'Unknown';
    const dayNum = parseInt(dateKey.split('-')[2]); // get the day number e.g. 19
    const oddOrEven = dayNum % 2 === 0 ? 'Even' : 'Odd';

    return {
      ...homer,
      day_of_week: dayOfWeek,
      odd_or_even: oddOrEven,
      home_runs_game: homer.home_runs_game // HRs hit that specific game
    };
  });

  console.log('Enriched data:', enriched); // useful for debugging

  // 4. Group by day of week — sum total HRs per day
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hrsByDay = {};
  daysOrder.forEach(d => hrsByDay[d] = 0); // initialize all days to 0

  enriched.forEach(entry => {
    if (hrsByDay[entry.day_of_week] !== undefined) {
      hrsByDay[entry.day_of_week] += entry.home_runs_game;
    }
  });

  // 5. Group by odd/even date — sum total HRs
  const hrsByOddEven = { Odd: 0, Even: 0 };
  enriched.forEach(entry => {
    hrsByOddEven[entry.odd_or_even] += entry.home_runs_game;
  });

  // 6. Build Chart 1 — HRs by Day of Week
  const ctx1 = document.getElementById('chartByDay').getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: daysOrder,
      datasets: [{
        label: 'Home Runs by Day of Week',
        data: daysOrder.map(day => hrsByDay[day]),
        backgroundColor: 'rgba(0, 90, 156, 0.7)', // Dodger blue
        borderColor: 'rgba(0, 90, 156, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Shohei HRs by Day of Week (2025)' }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Home Runs' } }
      }
    }
  });

  // 7. Build Chart 2 — HRs by Odd vs Even date
  const ctx2 = document.getElementById('chartByOddEven').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Odd Dates', 'Even Dates'],
      datasets: [{
        label: 'Home Runs by Odd/Even Date',
        data: [hrsByOddEven['Odd'], hrsByOddEven['Even']],
        backgroundColor: ['rgba(239, 83, 80, 0.7)', 'rgba(0, 90, 156, 0.7)'],
        borderColor: ['rgba(239, 83, 80, 1)', 'rgba(0, 90, 156, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Shohei HRs: Odd vs Even Game Dates (2025)' }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Home Runs' } }
      }
    }
  });
}

export default buildCharts;