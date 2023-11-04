import API_KEY from "./key.js";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city));
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  search.value = "";
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <div class="location">
        <small>${data.name}</small>, <small>${data.sys.country}</small>
        </div>
        <h2><img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png">${temp}°C</h2>  
        <div class="info">
        <strong>${data.weather[0].description}</strong>
        <p>Feels like <strong>${KtoC(data.main.feels_like)}°</strong></p>  
        </div>
        <div class="more-info">
        <small>Wind: <strong>${Math.floor(
          data.wind.speed * 3.6
        )}km/h</strong></small>
        <small>Humidity: <strong>${data.main.humidity}%</strong></small>
        </div>
    `;

  // Clean up
  main.innerHTML = "";

  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
