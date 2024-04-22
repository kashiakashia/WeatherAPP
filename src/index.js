let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here
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

// -------------------- functions -------------------------
function celsiusToFahrenheit(celsius) {
  // conversion C to F

  //°F = (9/5 × °C) + 32
  let fahrenheit = Math.round((9 / 5) * celsius + 32);

  return fahrenheit;
}

function sentenceToWords(cityName) {
  // splits sentence into separate words, which are capitalized -> euqal to python title()

  let i = 0;
  cityName.forEach((element) => {
    element = title(element);
    cityName[i] = element;
    i++;
  });
  cityName = cityName.join(" ");

  return cityName;
}

function title(word) {
  // capitalize only first letter of a given word

  let letter = word[0].toUpperCase();
  let title = letter + word.slice(1);

  return title;
}

function updateCity(event) {
  event.preventDefault();

  let searchedCity = document.querySelector("#city");
  let apiUrl = apiURL(searchedCity.value);

  axios.get(apiUrl).then(displayData);
}

function apiURL(city) {
  const apiKey = "3c3a6079af0b02obb02t493ac64d61cc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  return apiUrl;
}

function displayData(response) {
  console.log(response.data);
  let header = document.querySelector("h1");
  let cityCurrentTemp = document.querySelector("#city-temp");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let city = response.data.city;
  let temp = Math.round(response.data.temperature.current);

  header.innerHTML = city;
  cityCurrentTemp.innerHTML = temp;
  description.innerHTML = response.data.condition["description"];
  humidity.innerHTML = response.data.temperature.humidity + "%";
  wind.innerHTML = response.data.wind["speed"] + " km/h";
}

// --------------------------------------------------------
let city = document.querySelector("#city-search");
city.addEventListener("submit", updateCity);

let currentDate = document.querySelector("#todays-date");
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${minutes}`;

/* let city = prompt("Please eneter the city name");
if (weather[city] !== undefined) {
  city = city.toLowerCase();
}

if (city === "" || city === null) {
  alert(`City name cannot be empty`);
} 
else if (weather[city] !== undefined) {
  city = city.replace(/\s+/g, " ");                                 // get rid of multiple spaces
  let cityName = city.split(" ");

  if (cityName.length > 1) {
    cityName = sentenceToWords(cityName);
  } 
  else {
    cityName = title(city);
  }
  
  alert(
    `It is currently ${Math.round(weather[city].temp)}°C (${celsiusToFahrenheit(
      weather[city].temp
    )}°F) in ${cityName} with a humidity of ${weather[city].humidity}%`
  );
} 
else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
} */
