let now = new Date();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
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
let currentDay = days[now.getDay()];

let h2 = document.querySelector(".currentDay");
h2.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastEchday = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  forecastEchday.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class = "col-2">
      <div class = "date">
        ${formatDay(forecastDay.dt)}
      </div>
      <img src = "http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="icons" width="65" />
      <div class ="forecast-temp">
      <span class = "temp-max">  ${Math.round(forecastDay.temp.max)}°</span> 
      <span class ="temp-min"> ${Math.round(forecastDay.temp.min)}°</span>
    </div>
    </div>
   
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Show searching day and data in the searching city
/*function FormatData(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return ` ${hours}:${minutes}`;
}

document.querySelector("#currentdata").innerHTML = FormatData(
  response.data.dt * 1000
);
*/
// Changing Celsius and Fahrengate

function convertF(event) {
  event.preventDefault();
  let tempNew = document.querySelector("#temperature");
  tempNew.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
  celsius.classList.remove("active");
  fahrengate.classList.add("active");
}

function convertS(event) {
  event.preventDefault();
  let tempNew = document.querySelector("#temperature");
  tempNew.innerHTML = Math.round(celsiusTemp);

  celsius.classList.add("active");
  fahrengate.classList.remove("active");
}

let fahrengate = document.querySelector("#fara");
fahrengate.addEventListener("click", convertF);

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", convertS);

function getForecast(coords) {
  let apiKey = "4a8e2f6facdabec0ff87798adbd38ad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Serching City= cheng weather on page

function showWeather(response) {
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;

  let actualBackground = response.data.weather[0].main;
  console.log(response);

  if (actualBackground === "Clouds") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/clouds_app.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (actualBackground === "Thunderstorm") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/thunderstorm.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (actualBackground === "Drizzle") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/Drizzle.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (actualBackground === "Rain") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/rain.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (actualBackground === "Snow") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/snow.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (actualBackground === "Clear") {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/clear.mp4"
        autoplay
        muted
        loop
      ></video>`;
  } else if (
    actualBackground === "Mist" ||
    actualBackground === "Smoke" ||
    actualBackground === "Haze" ||
    actualBackground === "Dust" ||
    actualBackground === "Fog" ||
    actualBackground === "Sand" ||
    actualBackground === "Dust" ||
    actualBackground === "Ash" ||
    actualBackground === "Squall" ||
    actualBackground === "Tornado"
  ) {
    document.querySelector("#video-app").innerHTML = `
      <video
        class="media"
        id="video-app"
        src="video/mist.mp4"
        autoplay
        muted
        loop
      ></video>`;
  }

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  celsiusTemp = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
  console.log(response.data.weather[0].description);
}

let celsiusTemp = null;
// Opens the city that I specified
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

// Opens a city through search

function search(event) {
  event.preventDefault();
  let myCity = document.querySelector("#formes");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${myCity.value}`;
  let apiKey = "4a8e2f6facdabec0ff87798adbd38ad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
  celsius.classList.add("active");
  fahrengate.classList.remove("active");
}
let form = document.querySelector("#serch-cities");
form.addEventListener("submit", search);

// Opens current position

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a8e2f6facdabec0ff87798adbd38ad7";
  let apiNew = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  celsius.classList.add("active");
  fahrengate.classList.remove("active");
  axios.get(apiNew).then(showWeather);
}

//49.274384877555356, 23.490808055763512
function current() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", current);

searchCity("Kyiv");

// https://codesandbox.io/s/admiring-ramanujan-w40dt1?file=/src/app.js
