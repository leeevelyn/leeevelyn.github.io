let dodgersVsRainfall = null;
let shoheiVsDays = null;

async function loadData() {
  try{  
  
      const shoheiRuns = await fetch('https://raw.githubusercontent.com/stiles/dodgers/refs/heads/main/data/standings/dodgers_season_outcomes.json');
      console.log(data);

      return result;
    } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}
console.log(result.length());

function showExternal(data) {
  let shoheiVsDaysHTML = '';

  shoheiVsDaysHTML += `<div class = "standingsVsRain">
    <h2>Looking at Rainfall</h2>
    <p>Total homers: ${ghgj}</p>
  </div>`
  
}
export default loadData();
