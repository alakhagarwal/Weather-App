const mainForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const temperatureRadios = document.querySelectorAll(
  'input[name="temperature"]'
);
const currInfo = document.querySelector(".current-info");
const headerForm = document.querySelector("#weatherForm-header");
const daysForecast = document.querySelector(".days-forecast");

urls = {
  snow: "assets/snow.gif",
  rain: "assets/rain.gif",
  fog: "assets/fog.gif",
  wind: "assets/wind.gif",
  cloudy: "assets/cloudy.gif",
  "partly-cloudy-day": "assets/partly-cloudy-day.gif",
  "partly-cloudy-night": "assets/partly-cloudy-night.gif",
  "clear-night": "assets/clear-night.gif",
  "clear-day": "assets/clear-day.gif",
};

selectedTemperature = "metric"; // Default temperature unit: metric (Celsius)

async function fetchWeatherData(cityName, temperature) {
  // Fetch weather data from an API (e.g., OpenWeatherMap) using the cityName and temperature.
  // Replace "YOUR_API_KEY" with your actual API key.
  const apiKey = "4JB69F3K752WTPA5EVZN5XCMH";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/?key=${apiKey}&unitGroup=${temperature}&iconSet=icons1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Error fetching weather data:", data.message);
    }
  } catch (error) {
    alert("Error fetching weather data:", error);
  }
}
temperatureRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    selectedTemperature = event.target.value === "C" ? "metric" : "us";
    // Now you can use the selectedTemperature value as needed.
    console.log("Selected temperature:", selectedTemperature);
  });
});

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = cityInput.value;
  // Now you can use the cityName value as needed.
  console.log("City name:", cityName);
  // Fetch weather data using the cityName and selectedTemperature.
  fetchWeatherData(cityName, selectedTemperature).then((data) => {
    weatherData = data;
    DisplayWeatherData(weatherData);
  });
});

function DisplayWeatherData(weatherData) {
  mainForm.style.display = "none";
  headerForm.style.display = "flex";
  daysForecast.classList.add("show");
  currInfo.classList.add("show");

  console.log("Weather data:", weatherData.currentConditions["temp"]);

  const cityName = document.querySelector(".cityName");
  const currTime = document.querySelector(".currTime");
  cityName.textContent = weatherData.address;
  const currDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currDate.toLocaleDateString("en-US", options);
  currTime.textContent = `${formattedDate}, ${currDate.toLocaleTimeString()}`;

  const Sky = document.querySelector(".sky");
  const skyIcon = document.querySelector(".skyIcon");
  const temp = document.querySelector(".temp");

  Sky.textContent = weatherData.currentConditions["conditions"];
  skyIcon.setAttribute("src", urls[weatherData.currentConditions["icon"]]);
  console.log("Icon from API:", weatherData.currentConditions["icon"]);
  console.log("Mapped URL:", urls[weatherData.currentConditions["icon"]]);
}
