/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */

//import loadC from './load_data.js';

//const categoriesList = document.querySelector('#data-display');
//const data = await loadC();
//console.log(data);

function showCategories(data) {
  const categories = data.map(cator => {
   // console.log(cator.properties.city);
    return cator.properties.city.toUpperCase();
  });

  //console.log(categories);

  const normalize = (city) => city.toUpperCase().replace(/-/, ' ');

  const set = new Set(categories);
 // console.log(set);

  const newArray = [...set].sort().map(city => {
    return data.filter(item => item.properties.city.toUpperCase() === city);
  });

  //console.log(newArray);

  let textBox = '';

    newArray.forEach((restaurants) => {
      const cityName = restaurants[0].properties.city.toUpperCase();

    

  textBox += `<div class="category-card">
              <h2 class="category-header">${cityName}</h2>
              <p class="category-text">${restaurants.length} restaurant(s)</p>
              <ul class="category-text">
                  ${restaurants.map(item => 
                    `<li><b>${item.properties.name.toUpperCase()}</b> -
                    ${item.properties.address_line_1.toUpperCase()}`).join('')} </li>
                </ul>
              </div>`;
            });
  //categoriesList.innerHTML = textBox;
  return textBox;

  }

export default showCategories;

//data.map
//^make an array wrapped in a set (to get rid of duplicates)
//forEach category in the set, I filter the original dataset by the name of the category (city) 
//and the result of that filter operation is an array with every single restaurant in that city
//forEach category filter
//then categoriesHTML += and the text


  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
  
//---- All me below :(
  
    // Set up your event listeners
   
  /* html */

  /*`
                <h2 class="view-title">📂 Category View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Category View</h3>
                    <p><strong>Your task:</strong> Group the data by categories to show relationships</p>
                    <p><strong>Good for:</strong> Understanding patterns, finding similar items, exploring by type</p>
                    <p><strong>Consider:</strong> Group by cuisine? Neighborhood? Price range? What tells the best story?</p>
                    <p><strong>Available categories:</strong> ${[
                     ...new Set(data.map((item) => item.cuisine)), //from Alex et al
                    ].join(", ")}</p>
                </div>
            `;
}
*/

