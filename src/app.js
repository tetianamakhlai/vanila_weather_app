let apiKey = "3b304f6fbf39e6bd217e9118b5adafbf";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

let currentTemp = document.querySelector("#current_tempr");
function displayData(responce) {
  currentTemp.innerHTML = Math.round(responce.data.main.temp);
}

axios.get(apiUrl).then(displayData);
