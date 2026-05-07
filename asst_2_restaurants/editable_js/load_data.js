// ============================================
// DATA LOADING
// ============================================

async function loadData() {
  try {

      const response = await fetch('/data.json'); 
      const result = await response.json();
  
      return result.features;
  }catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData;