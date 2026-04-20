/**
 * TABLE VIEW
 * Display data in sortable rows - good for scanning specific information
 */


//import loadT from './load_data.js';

//const tableButton  = document.querySelector("#btn-table");
//const data = await loadT();
//console.log(data);

function showTable(data) {
    let textBox = `<table class="table">
                        <thead class="thead">
                           <tr class="trow">
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>CITY</th>
                                <th>INSPECTION RESULTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(item => 
                                `<tr class="trow2">
                                    <td>${item.properties.name}</td>
                                    <td>${item.properties.address_line_1}</td>
                                    <td>${item.properties.city}</td>
                                    <td>${item.properties.inspection_results}</td>
                                </tr>`
                                ).join(" ")}
                        </tbody>
                    </table>`;
    //console.log(textBox);
        return textBox;
                            }                      

export default showTable;

//tableButton.addEventListener('click', () => showTable(data));

//console.log(tableList); */

  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  //   https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/

                            
