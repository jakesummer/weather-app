import weather from "./modules/weather.js";

async function newSearch(search) {
  try {
    const data = await weather(search);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const search = searchInput.value;
    newSearch(search);
  });
}

init();
