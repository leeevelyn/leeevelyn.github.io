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

  export default loadData