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
  console.log(response);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-day">
                    ${day}
                    <div>
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                            class="forecast-icon" />
                    </div>
                    <div class="forecast-temp">
                        <span class="forecast-max"><strong>18°</strong></span> - <span class="forecast-min">14°</span>
                    </div>
                </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
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

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${minutes}`;

apiURL("Los Angeles");
displayForecast();
