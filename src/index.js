// -------------------- functions -------------------------

function updateCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#city");
  apiURL(searchedCity.value);
}

function apiURL(city) {
  const apiKey = "3c3a6079af0b02obb02t493ac64d61cc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

function getForecast(city) {
  const apiKey = "3c3a6079af0b02obb02t493ac64d61cc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayData(response) {
  let header = document.querySelector("h1");
  let cityCurrentTemp = document.querySelector("#city-temp");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;

  header.innerHTML = response.data.city;
  cityCurrentTemp.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition["description"];
  humidity.innerHTML = response.data.temperature.humidity + "%";
  wind.innerHTML = response.data.wind["speed"] + " km/h";

  getForecast(response.data.city);
}

function displayForecast(response) {
  const startIndex = now.getDay() + 1;
  const numberOfDays = 5;

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  for (let i = 0; i < numberOfDays; i++) {
    const index = (startIndex + i) % days.length;
    forecastHtml =
      forecastHtml +
      `<div class="forecast-day">
                    ${days[index]}
                    <div>
                        <img src="${
                          response.data.daily[index].condition.icon_url
                        }"
                            class="forecast-icon" />
                    </div>
                    <div class="forecast-temp">
                        <span class="forecast-max"><strong>${Math.round(
                          response.data.daily[index].temperature.maximum
                        )}°</strong></span> - 
                        <span class="forecast-min">${Math.round(
                          response.data.daily[index].temperature.minimum
                        )}°</span>
                    </div>
                </div>`;

    forecastElement.innerHTML = forecastHtml;
  }
}

function setDate() {
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentDate.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${minutes}`;
}
// --------------------------------------------------------

let now = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let city = document.querySelector("#city-search");
let currentDate = document.querySelector("#todays-date");

city.addEventListener("submit", updateCity);

setDate();
apiURL("Los Angeles");
displayForecast();
