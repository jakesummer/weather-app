import weather from "./modules/weather.js";

async function newSearch(search) {
  try {
    const data = await weather(search);
    updateDisplay(data);
  } catch {
    handleInvalidInput(search);
  }
}

function updateDisplay(data) {
  const locationText = document.getElementById("location");
  const conditionText = document.getElementById("condition");
  const dateText = document.getElementById("date");
  const iconImg = document.getElementById("icon");
  const tempText = document.getElementById("temperature");

  const location = data.resolvedAddress;
  locationText.textContent = location;

  const condition = data.currentConditions.conditions;
  conditionText.textContent = condition;

  const date = new Date(data.currentConditions.datetimeEpoch * 1000);
  dateText.textContent = date;

  const iconName = data.currentConditions.icon;
  import(`./assets/imgs/${iconName}.svg`).then((icon) => {
    iconImg.src = icon.default;
  });

  const temp = Math.round(data.currentConditions.temp);
  tempText.textContent = temp;
}

function handleInvalidInput(search) {
  const errorContainer = document.getElementById("error-container");
  const errorText = document.getElementById("error-text");

  errorText.textContent = `"${search}" not found!`;
  errorContainer.hidden = false;

  setTimeout(() => {
    errorContainer.hidden = true;
  }, 2000);
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
