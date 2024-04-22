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
