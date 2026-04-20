/**
 * STATS VIEW
 * Show aggregate statistics and insights - good for understanding the big picture
 */

//import loadS from './load_data.js';

//const tableButton  = document.querySelector("#btn-stats");
//const tableList = document.querySelector("#data-display");
//const data = await loadS();

//console.log(data);
function showStats(data) {

    // city count
    const cities = {};
    data.forEach((item) => {
        const city = item.properties.city.toUpperCase();
        cities[city] = (cities[city] || 0) + 1;
    });

    Object.entries(cities).forEach(([city]) =>{
       // console.log(city.length);
    })
    
    //const cityCount = cities.length;
    //console.log(cities);

    const compliantRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Compliance Schedule - Completed" || 
            item.properties.inspection_results === "Compliance Schedule - Outstanding" ||
            item.properties.inspection_results === "Compliant - No Health Risk")
    });
   // console.log("Compliant restaurants:", compliantRestaurants.length);

    const grossRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Critical Violations observed" || 
            item.properties.inspection_results === "Facility Closed" ||
            item.properties.inspection_results === "Non-Compliant - Violations Observed")
    });
   // console.log("Noncompliant restaurants:", grossRestaurants.length);

    const reopenedRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Facility Reopened")
    });
   // console.log("Reopened restaurants:", reopenedRestaurants.length);

    const totalRestaurants = data.length;
  //  console.log(totalRestaurants);

    const totalCities = Object.keys(cities).length;
  //  console.log(totalCities);

    let textBox = '';
    
    textBox += `<div class = "stats-chart">
        <div class = "stats-card">
        <h2 class = "stats-header">CITIES COVERED</h2>
        <p class="stats-text">${totalCities}</p>
        </div>
        <div class ="stats-card">
        <h2 class = "stats-header">RESTAURANTS INSPECTED</h2>
        <p class="stats-text">${totalRestaurants}</p>
        </div>
        <div class = "stats-card">
        <h2 class = "stats-header">COMPLIANT RESTAURANTS</h2>
        <p class="stats-text">${compliantRestaurants.length}</p>
        </div>
        <div class = "stats-card">
        <h2 class = "stats-header">NONCOMPLIANT RESTAURANTS</h2>
        <p class="stats-text">${grossRestaurants.length}</p>
        </div>
        <div class ="stats-card">
        <h2 class = "stats-header">REOPENED RESTAURANTS</h2>
        <p class="stats-text">${reopenedRestaurants.length}</p>
        </div>
    </div>`
    return textBox
    }

export default showStats;
/*
    




newArray.forEach((restaurants) => {
    const totalRestaurants = 
})
//console.log(totalRestaurants);

    const compliance = {};
    data.forEach((item) => {
        const compliant = item.properties.inspection_results.toUpperCase();
        compliance[compliant] = (compliance[compliant] || 0) + 1;
    });
    console.log(compliance);
   
    Object.entries(compliance).forEach(([compliant]) =>{
        console.log(compliant);
    })

COMPLIANCE SCHEDULE - COMPLETED
COMPLIANCE SCHEDULE - OUTSTANDING
COMPLIANT - NO HEALTH RISK
FACILITY REOPENED
CRITICAL VIOLATIONS OBSERVED
FACILITY CLOSED
NON-COMPLIANT - VIOLATIONS OBSERVED
*/


  // Requirements:
  // Replace the below "task" description with the following:
  // - One meaningful statistic calculation from the supplied dataset
  // ===- percent of restaurants not passing hand-washing, for example
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  
  /* Javascript calculations here */   


  
  /* html return */ 
  /*
  return `
                <h2 class="view-title">Stats View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Statistics View Here</h3>
                    <p><strong>Total records:</strong> ${data.length} items to analyze</p>
                    <p><strong>Your task:</strong> Calculate and display key insights from the data</p>
                    <p><strong>Consider:</strong> Average ratings? Price distribution? Most common cuisines? Geographic spread?</p>
                    <p><strong>Good for:</strong> Understanding trends, making data-driven decisions, seeing the big picture</p>
                </div>
            `;
}


*/