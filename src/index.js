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
function buscar(event) {
  event.preventDefault();

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
  let newTemp = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".Humidity");
  let icon = document.querySelector("#icon");
  celciusTemp = Math.round(response.data.main.temp);
  newTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
function showCurrentPlaceTemp(response) {
  let city = document.querySelector(".city");
  let newTemp = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".Humidity");
  city.innerHTML = `${response.data.sys.country}`;
  newTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  celciusTemp = Math.round(response.data.main.temp);
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
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let celciusTemp = 20.0;
let unidadTempC = document.querySelector("#celcius");
unidadTempC.addEventListener("click", celcius);

let unidadTempF = document.querySelector("#fahrenheit");
unidadTempF.addEventListener("click", fahrenheit);

let apiKey = "e36512df4df508262b473b23a2ee8768";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

let busca = document.querySelector("#buscaButton");
busca.addEventListener("click", buscar);

let currentB = document.querySelector("#currentButton");
currentB.addEventListener("click", getPosition);
