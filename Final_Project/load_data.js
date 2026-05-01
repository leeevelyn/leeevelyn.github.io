async function loadData() {
  try {
    const response = await fetch('./shohei_homers.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data");
  }
}

export default loadData;