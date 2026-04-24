import "./style.css";
import weather from "./modules/weather.js";
import { format } from "date-fns";

async function newSearch(search, unit) {
  try {
    const data = await weather(search, unit);
    updateDisplay(data)
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
  const formattedDate = format(date, "EEEE, LLL do");
  dateText.textContent = formattedDate;

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
  // Default weather on page load
  newSearch("New York, NY, United States", "us");

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const unitCheckbox = document.getElementById("temp-unit-toggle");
  const locationText = document.getElementById("location");

  const getUnit = () => {
    return unitCheckbox.checked ? "us" : "metric";
  };

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const search = searchInput.value;
    newSearch(search, getUnit());
    searchInput.value = "";
  });

  unitCheckbox.addEventListener("click", () => {
    const currentLocation = locationText.textContent;
    newSearch(currentLocation, getUnit());
  });
}

init();
