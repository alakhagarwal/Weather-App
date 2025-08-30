const mainForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const temperatureRadios = document.querySelectorAll(
  'input[name="temperature2"]'
);

const temparatureRadiosHeader = document.querySelectorAll(
  'input[name="temperature1"]'
);
const currInfo = document.querySelector(".current-info");
const headerForm = document.querySelector("#weatherForm-header");
const daysForecast = document.querySelector(".days-forecast");
const daysDiv = document.querySelector(".forecast-days");
const hoursDiv = document.querySelector(".hours-data");
const loading = document.querySelector(".loading");

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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function displayNext15Hours(weatherData, hoursDiv, tempunit) {
  const now = new Date();
  const currentHour = now.getHours();
  let hoursDisplayed = 0;
  const maxHours = 15;

  // Start from today and potentially go to tomorrow
  for (
    let dayIndex = 0;
    dayIndex < 2 && hoursDisplayed < maxHours;
    dayIndex++
  ) {
    const dayData = weatherData.days[dayIndex];

    for (const hourData of dayData.hours) {
      if (hoursDisplayed >= maxHours) break;

      const hourTime = parseInt(hourData.datetime.split(":")[0]);

      if (dayIndex === 0 && hourTime < currentHour) {
        continue;
      }

      // Create the hour element
      const hour = document.createElement("div");
      hour.classList.add("hour");

      const time = document.createElement("p");
      time.textContent = hourData.datetime.substring(0, 5); // "20:00"

      const hourIcon = document.createElement("img");
      hourIcon.classList.add("forecastIcon");
      hourIcon.setAttribute("src", urls[hourData.icon]);

      const hourTemp = document.createElement("h4");
      hourTemp.textContent = `${Math.round(hourData.temp)}${tempunit}`;

      hour.appendChild(time);
      hour.appendChild(hourIcon);
      hour.appendChild(hourTemp);

      hoursDiv.appendChild(hour);

      hoursDisplayed++;
    }
  }
}

let selectedTemperature = "metric";

async function fetchWeatherData(cityName, temperature) {

  const apiKey = "4JB69F3K752WTPA5EVZN5XCMH";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/?key=${apiKey}&unitGroup=${temperature}&iconSet=icons1`;

  try {
    loading.style.display = "block";
    currInfo.classList.remove("show");
    daysForecast.classList.remove("show");
    const response = await fetch(apiUrl); // if there is an error like network issue then the fetch will throw error and these will be caught by try catch

    console.log(response);

    let data; // bcoz if the response is not ok then data will be some text or html

    if (response.ok) {
      data = await response.json(); // if response is ok then only we will parse it to json
      console.log("Weather data fetched successfully:", data);
      loading.style.display = "none";
      return data;
    } else {
      // HTTP errors (wrong city, bad API key, etc.) // bcoz these dont through error by themsevles

      let errorMessage;

      switch (response.status) {
        case 400:
          errorMessage = "Invalid city name. Please check spelling.";
          break;
        case 401:
          errorMessage = "Invalid API key.";
          break;
        case 429:
          errorMessage = "Too many requests. Try again later.";
          break;
        case 404:
          errorMessage = "City not found.";
          break;
        default:
          errorMessage = `Server error (${response.status}). Try again later.`;
      }

      throw new Error(`Weather API Error: ${errorMessage}`);
    }
  } catch (error) {
    // Network errors OR thrown HTTP errors
    alert(error);
    loading.style.display = "none";
    throw error; // Rethrow the error to be handled by the caller
  }
}
temperatureRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    selectedTemperature = event.target.value === "C" ? "metric" : "us";

    console.log("Selected temperature:", selectedTemperature);
  });
});

temparatureRadiosHeader.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    selectedTemperature = event.target.value === "C" ? "metric" : "us";

    console.log("Selected temperature:", selectedTemperature);
  });
});

headerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName2 = document.querySelector("#cityInput2").value;
  fetchWeatherData(cityName2, selectedTemperature).then((data) => {
    weatherData = data;
    hoursDiv.innerHTML = "";
    daysDiv.innerHTML = "";
    DisplayWeatherData(weatherData);
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
    month: "long",
    day: "numeric",
  };
  const formattedDate = currDate.toLocaleDateString("en-US", options);
  currTime.textContent = formattedDate;

  const Sky = document.querySelector(".sky");
  const skyIcon = document.querySelector(".skyIcon");
  const temp = document.querySelector(".temp");

  let tempunit = "°C";
  let windunit = "km/hr";
  let precunit = "mm";

  if (selectedTemperature == "metric") {
    tempunit = "°C";
    windunit = "km/hr";
    precunit = "mm";
  } else {
    tempunit = "°F";
    windunit = "mph";
    precunit = "in";
  }

  Sky.textContent = weatherData.currentConditions["conditions"];
  skyIcon.setAttribute("src", urls[weatherData.currentConditions["icon"]]);
  temp.textContent = `${weatherData.currentConditions["temp"]}${tempunit}`;

  const windSpeed = document.querySelector("#windSpeed");
  windSpeed.textContent = `${weatherData.currentConditions["windspeed"]} ${windunit}`;

  humidityValue = document.querySelector("#humidityValue");
  humidityValue.textContent = `${weatherData.currentConditions["humidity"]}%`;

  precValue = document.querySelector("#precValue");
  precValue.textContent = `${weatherData.currentConditions["precip"]}${precunit}`;

  feeltempValue = document.querySelector("#feeltempValue");
  feeltempValue.textContent = `${weatherData.currentConditions["feelslike"]}${tempunit}`;

  // Dispalying only the days left in the day
  displayNext15Hours(weatherData, hoursDiv, tempunit);

  for (let i = 1; i < 15; i++) {
    let dayForecast = weatherData.days[i];

    const day = document.createElement("div");
    day.classList.add("day");
    const date = document.createElement("p");
    date.textContent = formatDate(dayForecast["datetime"]);

    const tempDetail = document.createElement("div");
    tempDetail.classList.add("temp-detail");
    const dayIcon = document.createElement("img");
    dayIcon.classList.add("dayIcon");
    dayIcon.setAttribute("src", urls[dayForecast["icon"]]);
    const maxTemp = document.createElement("h4");
    maxTemp.classList.add("max-temp");
    maxTemp.textContent = `${dayForecast["tempmax"]} ${tempunit}`;
    const minTemp = document.createElement("p");
    minTemp.classList.add("min-temp");
    minTemp.textContent = `${dayForecast["tempmin"]} ${tempunit}`;

    tempDetail.appendChild(dayIcon);
    tempDetail.appendChild(maxTemp);
    tempDetail.appendChild(minTemp);

    day.appendChild(date);
    day.appendChild(tempDetail);
    daysDiv.appendChild(day);
  }
}
