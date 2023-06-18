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

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000); // Qustion!! the time is late . Why? Why in another lesson we didnt use timestamp parameter
}

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
    ` 0${hrs}`;
  }
  if (minuts < 10) {
    `0${minuts}`;
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
document.querySelector("#currentTime").innerHTML = time; */

let apiKey = "3b304f6fbf39e6bd217e9118b5adafbf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
