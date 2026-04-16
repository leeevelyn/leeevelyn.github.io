
/**
 * EXTERNAL LIBRARY VIEW
 * Pick an external library and pipe your data to it.
 */

let myChart = null;

function showExternal(data) {
    let externalHTML = '';
    //make a variable here and keep adding to it
    //let (bc it'll be changed) templateHTML += <div class> and just keep adding to it
    //create html canvas in here. call it canvas

    const compliantRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Compliance Schedule - Completed" || 
            item.properties.inspection_results === "Compliance Schedule - Outstanding" ||
            item.properties.inspection_results === "Compliant - No Health Risk")
    });
   console.log("Compliant restaurants:", compliantRestaurants.length);
    const grossRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Critical Violations observed" || 
            item.properties.inspection_results === "Facility Closed" ||
            item.properties.inspection_results === "Non-Compliant - Violations Observed")
    });
   console.log("Noncompliant restaurants:", grossRestaurants.length);

    const reopenedRestaurants = data.filter((item) => {
        return (item.properties.inspection_results === "Facility Reopened")
    });
   console.log("Reopened restaurants:", reopenedRestaurants.length);

   
    externalHTML += `<div class = "template_view">
        <h2>Restaurant Inspection Results</h2>
        <p>Total restaurants: ${data.length}</p>
        <div style="position: relative; width: 100%; height: 400px;">
                <canvas id="myChart"></canvas>
            </div>
    </div>`

    setTimeout(() => {
        if (myChart) {
            myChart.destroy();
        }
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Compliant", "Non-Compliant", "Reopened Restaurants"],
                datasets: [{
                    label: "Restaurant List",
                    data: [
                        compliantRestaurants.length,
                        grossRestaurants.length,
                        reopenedRestaurants.length
                    ],
                }]
            }
        });
})
return externalHTML;
}
export default showExternal;