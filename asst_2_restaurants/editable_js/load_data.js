// ============================================
// DATA LOADING
// ============================================

async function loadData() {
  try {
    // Load your data here by passing a string to the Fetch request.
    // It should be in data.json in the root folder, but you'll need to look at the results to see what's there.

      const response = await fetch('/data.json'); 
      const result = await response.json();
  
      // you'll need to look at the returned data and pick what to pass out of this function
      //console.log(result.features);
      return result.features;
  }catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData;