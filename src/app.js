function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperatures");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#main_city");
  city.innerHTML = response.data.name;
  let feelsLike = document.querySelector("#feels_like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

let apiKey = "3b304f6fbf39e6bd217e9118b5adafbf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
