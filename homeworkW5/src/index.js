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
  let tempC = Math.round(((temp.innerHTML - 32) * 5) / 9);
  temp.innerHTML = `${tempC}`;
}
function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  console.log(temp.innerHTML);
  let tempF = Math.round(temp.innerHTML * 1.8) + 32;

  temp.innerHTML = `${tempF}`;
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
    alert("no city");
  }
}
function showTemperature(response) {
  console.log("temp");
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector(".temperature");
  newTemp.innerHTML = `${temp}`;
}
function showCurrentPlaceTemp(response) {
  console.log("current");
  let temp = Math.round(response.data.main.temp);
  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.sys.country}`;
  let newTemp = document.querySelector(".temperature");
  newTemp.innerHTML = `${temp}`;
  console.log(response);
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

let busca = document.querySelector("#buscaButton");
busca.addEventListener("click", buscar);

let currentB = document.querySelector("#currentButton");
currentB.addEventListener("click", getPosition);

let unidadTempC = document.querySelector("#celcius");
unidadTempC.addEventListener("click", celcius);

let unidadTempF = document.querySelector("#fahrenheit");
unidadTempF.addEventListener("click", fahrenheit);

let apiKey = "e36512df4df508262b473b23a2ee8768";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
