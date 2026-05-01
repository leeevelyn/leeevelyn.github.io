//import loadData from './load_data.js';
//import dodgersRain from './dodgersVsRain.js';
import buildCharts from './shoheiVsDayOfWeek.js';

import buildRainfallCharts from './dodgersVsRain.js';
buildRainfallCharts();
/*
function updateDisplay(content) {
  document.getElementById("data-display").innerHTML = content;
}

function updateButtonStates(activeView) {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(`btn-${activeView}`).classList.add("active");
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Starting application...");

  try {
    // Load data once
    showLoading();
    const data = await loadData();
    console.log(`Loaded ${data.length} items from API`);

    // Set up button event handlers - this pattern always works!
    document.getElementById("btn-day").onclick = () => {
      updateDisplay(showExternal(data));
      updateButtonStates("day");
    };

    document.getElementById("btn-date").onclick = () => {
      updateDisplay(showTable(data));
      updateButtonStates("date");
    };

    // Show initial view
    updateDisplay(showExternal(data));
    updateButtonStates("external");

    console.log("Application ready!");
  } catch (error) {
    console.error("Application failed to start:", error);
    showError(error.message);
  }
});
*/

buildCharts();
