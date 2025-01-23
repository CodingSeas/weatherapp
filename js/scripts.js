// API URLs and key
const url = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
const url2 = "http://api.openweathermap.org/geo/1.0/direct";

let tempType = "C"; // Default temperature type
let dataFetched = {}; // Store fetched data

// Fetch weather data based on city name
async function weatherFn() {
  const cName = document.getElementById("city-input").value;
  const place = `${url2}?q=${cName}&appid=${apiKey}`;
  try {
    const res2 = await fetch(place);
    const data2 = await res2.json();
    document.getElementById("city-input").value = ""; // Reset the city input

    const lat = data2[0].lat;
    const lon = data2[0].lon;
    const placeName = data2[0].name + ", " + data2[0].country;
    if (res2.ok) {
      const temp_data = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      try {
        const res = await fetch(temp_data);
        const data = await res.json();

        dataFetched = data;

        const weathercode = data.list[0].weather[0].icon;

        changeBackground(weathercode.slice(-1)); // Applies the day or night theme
        updateWeatherCard(weathercode.substring(0, 2));

        weatherShowFn(data, placeName);
        weatherForecast(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } else {
      alert("Cannot fetch City's weather. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching Location data:", error);
    alert("City not found. Please try again.");
  }
}

// Update weather card based on weather code
function updateWeatherCard(weatherCode) {
  const card_front = document.querySelector(".card-front");
  const card_back = document.querySelector(".card-back");
  const weatherClasses = [
    "weather-foggy",
    "weather-partly-cloudy",
    "weather-rainy",
    "weather-snowy",
    "weather-default",
  ];

  // Remove existing weather-related classes
  weatherClasses.forEach((cls) => card_front.classList.remove(cls));
  weatherClasses.forEach((cls) => card_back.classList.remove(cls));

  // Map weather codes to corresponding classes
  const weatherClassMap = {
    50: "weather-foggy", // Foggy
    "02": "weather-partly-cloudy", // Partly cloudy
    "03": "weather-partly-cloudy", // Scattered clouds
    "04": "weather-partly-cloudy", // Broken clouds
    "09": "weather-rainy", // Shower rain
    10: "weather-rainy", // Rain
    11: "weather-rainy", // Thunderstorm
    13: "weather-snowy", // Snow
  };

  // Determine the class to add
  const weatherClass = weatherClassMap[weatherCode] || "weather-default";

  // Weather changes in card
  weatherContainer(weatherCode);

  // Add the new class
  card_front.classList.add(weatherClass);
  card_back.classList.add(weatherClass);
}

// Change background based on day or night
function changeBackground(dayOrNight) {
  const body = document.body;

  // Remove existing theme classes
  body.classList.remove("day-theme", "night-theme");

  // Add the appropriate theme class
  if (dayOrNight !== "n") {
    body.classList.add("day-theme");
  } else {
    body.classList.add("night-theme");
  }
}

// Update weather container based on weather type
function weatherContainer(type) {
  $(".weather-container").empty();
  document.body.classList.remove("rain-theme-day");
  if (type == "13") {
    createSnowflakes(25);
  } else if (type == "11" || type == "10" || type == "09") {
    const rainIntensity = type == "11" ? 200 : type == "10" ? 100 : 20;
    createRain(rainIntensity);
  }
}

// Display weather information
function weatherShowFn(data, cName) {
  $("#city-name").text(cName);
  $("#date").text(
    moment(new Date(data.list[0].dt_txt)).format("MMMM Do, YYYY")
  );
  $("#temperature").html(tempChange(data.list[0].main.temp, tempType));
  $("#description").text(data.list[0].weather[0].main);
  $("#wind-speed").html(
    `<i class="fa-solid fa-wind"></i> ${data.list[0].wind.speed} m/s`
  ); // Adding wind icon
  $("#humidity").html(
    `<i class="fa-solid fa-umbrella"></i> ${data.list[0].main.humidity}%`
  );
  $(".weather-icon").attr(
    "src",
    `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
  );

  $("#weather-info").fadeIn();
  $("#details").css("justify-content", "space-around");
}

// Display weather forecast
function weatherForecast(data) {
  const forecast_container = document.querySelector(".container .forecast");
  forecast_container.innerHTML = ``; // Removes previous forecasts

  for (let i = 8; i < 33; i += 8) {
    const forecast_element = document.createElement("div");

    const forecast_element_temp = document.createElement("h3");
    const forecast_element_humidity = document.createElement("p");
    const forecast_element_day = document.createElement("h2");
    const forecast_element_icon = document.createElement("img");

    forecast_element_icon.classList.add("weather-icon");
    forecast_element_icon.alt = "weather-icon";
    forecast_element_icon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;

    forecast_element_temp.innerHTML = tempChange(data.list[i].main.temp);
    forecast_element_temp.classList.add("temperature");

    forecast_element_humidity.innerHTML = `<i class="fa-solid fa-umbrella"></i> ${data.list[i].main.humidity}%`;

    const date = new Date(data.list[i].dt_txt);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    forecast_element_day.innerHTML = `${dayNames[date.getDay()]}`;

    forecast_element.append(
      forecast_element_day,
      forecast_element_icon,
      forecast_element_temp,
      forecast_element_humidity
    );
    forecast_element.classList.add("forecast-element");
    forecast_container.appendChild(forecast_element);
  }
}

// Create snowflakes animation
function createSnowflakes(count) {
  const container = document.querySelector(".container .weather-container");

  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement("i");
    snowflake.classList.add("fa", "fa-snowflake", "snowflake");

    // Random horizontal position
    snowflake.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 10 + 5; // Between 10s and 15s
    const delay = Math.random() * 10; // Between 0s and 5s
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;

    // Random size
    const size = Math.random() * 10 + 10; // Between 10px and 20px
    snowflake.style.fontSize = `${size}px`;

    container.appendChild(snowflake);
  }
}

// Create rain animation
function createRain(count) {
  const container = document.querySelector(".container .weather-container");
  const body = document.body;
  if (body.className.includes("day-theme")) {
    body.classList.remove("day-theme");
    body.classList.add("rain-theme-day");
  }

  for (let i = 0; i < count; i++) {
    const raindrop = document.createElement("i");
    raindrop.classList.add("fa", "fa-tint", "raindrop");

    // Random horizontal position
    raindrop.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 2 + 1; // Between 1s and 3s
    const delay = Math.random() * 10; // Between 0s and 10s
    raindrop.style.animationDuration = `${duration}s`;
    raindrop.style.animationDelay = `${delay}s`;

    // Random size
    const size = Math.random() * 5 + 5; // Between 5px and 10px
    raindrop.style.fontSize = `${size}px`;

    container.appendChild(raindrop);
  }
}

// Change temperature unit
function changeTempUnit(data = dataFetched) {
  const tempElement = document.getElementById("temperature");
  const currentTemp = parseFloat(tempElement.textContent);
  if (!isNaN(currentTemp)) {
    if (tempType === "F") {
      tempElement.textContent = ((currentTemp * 9) / 5 + 32).toFixed(1) + " °F";
    } else {
      tempElement.textContent =
        (((currentTemp - 32) * 5) / 9).toFixed(1) + " °C";
    }
    weatherForecast(data);
  }
}

// Convert temperature based on type
function tempChange(temp, type = tempType) {
  if (type === "F") {
    return (((temp - 273.15) * 9) / 5 + 32).toFixed(1) + " °F";
  } else {
    return (temp - 273.15).toFixed(1) + " °C";
  }
}

// Add event listeners to toggle buttons
const toggleButtons = document.getElementsByClassName("toggle-button");

for (let i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener("click", handleUnitChange);
}

// Handle temperature unit change
function handleUnitChange(e) {
  const clickedElement = e.target;

  const hasUnitEnabled = clickedElement.classList.contains("unit-enabled");

  if (hasUnitEnabled) {
    return;
  }

  const clickedId = clickedElement.id;
  let otherUnit = undefined;

  if (clickedId == "celsius-button") {
    otherUnit = document.getElementById("fahrenheit-button");
    tempType = "C";
  } else if (clickedId == "fahrenheit-button") {
    otherUnit = document.getElementById("celsius-button");
    tempType = "F";
  }
  clickedElement.classList.add("unit-enabled");
  otherUnit.classList.remove("unit-enabled");
  changeTempUnit();
}
