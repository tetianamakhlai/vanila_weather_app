function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hrs = date.getHours();
  let minuts = date.getMinutes();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfTheWeek = days[date.getDay()];
  if (hrs < 10) {
    hrs = ` 0${hrs}`;
  }
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  return `${dayOfTheWeek}, ${hrs}:${minuts}`;
}
// What is the difference with the second option of setting a time
//let currentTime = new Date();
/* const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let time = `${dayOfWeek},${hours}:${minutes}`;
document.querySelector("#currentTime").innerHTML = time; 
*/

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperatures");
  let city = document.querySelector("#main_city");
  let feelsLike = document.querySelector("#feels_like");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000); // Qustion!! the time is late . Why? Why in another lesson we didnt use timestamp parameter
  console.log(response.data.dt * 1000);
  icon.setAttribute(
    // wooow.. interesting... attribute to element JS
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordin) {
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordin.lat}&lon=${coordin.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "3b304f6fbf39e6bd217e9118b5adafbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showFahrenheitTempr(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperatures");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTempr(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatures");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastWeather = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastWeather.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="weather-forecast-day">
    ${formatDay(forecastDay.dt)}
    </div>
    <img src="https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
     alt="Clear" id="icon" />
    <div>
    <spam id="weather-forecast-max"> ${Math.round(
      forecastDay.temp.max
    )}°</spam> <spam id="weather-forecast-min">${Math.round(
          forecastDay.temp.min
        )}°</spam>
  </div>
  </div>
  
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTempr);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTempr);

search("New York");
