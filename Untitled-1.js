fetch('https://raw.githubusercontent.com/stiles/dodgers/refs/heads/main/data/standings/dodgers_season_outcomes.json')
  .then(r => r.json())
  .then(data => console.log(data));