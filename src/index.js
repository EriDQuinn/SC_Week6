function celcius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = celciusTemp;
  unidadTempC.classList.add("active");
  unidadTempF.classList.remove("active");
}
function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let tempF = Math.round(celciusTemp * 1.8) + 32;
  temp.innerHTML = `${tempF}`;
  unidadTempC.classList.remove("active");
  unidadTempF.classList.add("active");
}
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();

  return days[day];
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (day, index) {
    if (index >= 1 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="card border-info">
          <h6 class="card-title">${formatDay(day.dt)}</h6>
          <img
            src="https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png"
            alt="icon weather img"
            id="forecastIcon"
          />
          <p>MaxT:${Math.round(day.temp.max)} º</p>
          <p>MinT:${Math.round(day.temp.min)} º</p>
        </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiF = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiF).then(displayForecast);
}
function buscar(event) {
  event.preventDefault();
  unidadTempC.classList.add("active");
  unidadTempF.classList.remove("active");
  let cityInput = document.querySelector("#ciudadBuscar");
  console.log(cityInput.value);

  if (cityInput.value !== "") {
    let city = document.querySelector(".city");
    console.log(cityInput.value);
    city.innerHTML = `${cityInput.value}`;
    axios
      .get(`${apiUrl}&appid=${apiKey}&q=${cityInput.value}`)
      .then(showTemperature);
  } else {
    alert("No city to search");
  }
}
function showTemperature(response) {
  console.log(response.data.rain);
  let newTemp = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let precipitation = document.querySelector(".precipitation");
  let wind = document.querySelector(".wind-speed");
  let icon = document.querySelector("#icon");
  celciusTemp = Math.round(response.data.main.temp);
  newTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  /*rain only works when it is raining */
  precipitation.innerHTML = response.data.rain["1h"];
  console.log(response);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function showCurrentPlaceTemp(response) {
  console.log(response.data.rain);
  let city = document.querySelector(".city");
  let newTemp = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind-speed");
  let icon = document.querySelector("#icon");
  let precipitation = document.querySelector(".precipitation");

  city.innerHTML = `${response.data.sys.country}`;
  newTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  celciusTemp = Math.round(response.data.main.temp);
  wind.innerHTML = Math.round(response.data.wind.speed);
  /*rain only works when it is raining */
  precipitation.innerHTML = response.data.rain["1h"];

  unidadTempC.classList.add("active");
  unidadTempF.classList.remove("active");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
function showPosition(response) {
  console.log("position");
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  console.log(`Latitude: ${latitude} `);
  console.log(`Longitude: ${longitude}`);

  axios
    .get(`${apiUrl}&appid=${apiKey}&lat=${latitude}&lon=${longitude}`)
    .then(showCurrentPlaceTemp);

  let apiF = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiF).then(displayForecast);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date();
let day = days[currentDate.getDay()];
let numDay = currentDate.getUTCDate();
let year = currentDate.getFullYear();
let month = months[currentDate.getMonth()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${day} ${numDay}, ${month} ${year}, ${hour} : ${minutes} `;

let apiKey = "e36512df4df508262b473b23a2ee8768";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

let celciusTemp = 20.0;

let unidadTempC = document.querySelector("#celcius");
unidadTempC.addEventListener("click", celcius);

let unidadTempF = document.querySelector("#fahrenheit");
unidadTempF.addEventListener("click", fahrenheit);

let busca = document.querySelector("#buscaButton");
busca.addEventListener("click", buscar);

let currentB = document.querySelector("#currentButton");
currentB.addEventListener("click", getPosition);
