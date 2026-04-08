// ============================================
// DATA LOADING
// ============================================

async function loadData() {
  try {
    // Load your data here by passing a string to the Fetch request.
    // It should be in data.json in the root folder, but you'll need to look at the results to see what's there.

    async function loadData() {
      const response = await fetch('/asst_2_restaurants/data.json'); // you'll need to edit this line
      const data = await response.json("data loaded", data);
  
      // you'll need to look at the returned data and pick what to pass out of this function
      return data;
  }
    const response = await fetch ('/asst_2_restaurants/data.json')  // go get some data
    const data = await response.json();
    console.log("data loaded", data);
    
    // You'll need to look at that data in the console to make sure you have restaurants to work with
    return data;
  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData