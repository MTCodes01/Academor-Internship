// Tried making the 7-day forecast but in the free tier of the API its only having the current weather and 3-hour Forecast 5 days

const apiKey = "3f5ff7d4c3a87487b1cddacd364d3d2d";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  document.getElementById("temp").textContent =
    "Geolocation is not supported by this browser.";
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getCurrentWeather(latitude, longitude);
  getForecast(latitude, longitude);
}

async function getCurrentWeather(latitude, longitude) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Just for Viewing the json response
    console.log("Current Weather Data:", JSON.stringify(data, null, 2));

    const weatherContainer = document.querySelector(".container");

    const temp = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `./icons/${iconCode}.png`;
    const humidity = data.main.humidity;
    const wind_speed = data.wind["speed"];
    const dateTime = new Date(data.dt * 1000).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    weatherContainer.innerHTML = `
      <h2>${dateTime}</h2>
      <img id="status_img" src="${iconUrl}" />
      <h2 id="temp">${temp}°C</h2>
      <h2 id="status_text">${description}</h2>
      <h2 id=humidity>Humidity : ${humidity}</h2>
      <h2 id=humidity>Wind Speed : ${wind_speed}</h2>
      <h2 id="location">${data.name + ", " + data.sys.country}</h2>
    `;
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
}

async function getForecast(latitude, longitude) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Just for Viewing the json response
    console.log("Forecast Data:", JSON.stringify(data, null, 2));

    const dailyForecasts = {};

    data.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          temps: [],
          descriptions: [],
          icons: [],
        };
      }

      dailyForecasts[date].temps.push(entry.main.temp);
      dailyForecasts[date].descriptions.push(entry.weather[0].description);
      dailyForecasts[date].icons.push(entry.weather[0].icon);
    });

    const box_2 = document.querySelector(".box_2");
    box_2.innerHTML = `
      <h1>${Object.keys(dailyForecasts).length - 1}-Day Forecast</h1>
      <div class="forecast-container"></div>
    `;
    const forecastContainer = document.querySelector(".forecast-container");

    Object.keys(dailyForecasts)
      .slice(1, 7)
      .forEach((date) => {
        const temps = dailyForecasts[date].temps;
        const avgTemp = Math.round(
          temps.reduce((sum, temp) => sum + temp, 0) / temps.length - 273.15
        );

        const description = dailyForecasts[date].descriptions[0];
        const iconCode = dailyForecasts[date].icons[0];
        const iconUrl = `./icons/${iconCode}.png`;

        forecastContainer.innerHTML += `
        <div class="forecast-day">
          <h2>${date}</h2>
          <img src="${iconUrl}" alt="Weather Icon">
          <p>${avgTemp}°C</p>
          <p>${description}</p>
        </div>
      `;
      });
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

async function searchWeather() {
  try {
    const inp = document.getElementById("searchInput").value;

    if (inp == "") {
      alert("No Value Inputted");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("temp").textContent =
          "Geolocation is not supported by this browser.";
      }
    } else {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inp}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Just for Viewing the json response
      console.log("Data by city:", JSON.stringify(data, null, 2));

      const dailyForecasts = {};

      data.list.forEach((entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            dateTime: [],
            temps: [],
            descriptions: [],
            icons: [],
            wind_speeds: [],
            humidities: [],
          };
        }

        dailyForecasts[date].dateTime.push(new Date(entry.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
        );
        dailyForecasts[date].temps.push(entry.main.temp);
        dailyForecasts[date].descriptions.push(entry.weather[0].description);
        dailyForecasts[date].icons.push(entry.weather[0].icon);
        dailyForecasts[date].wind_speeds.push(entry.wind.speed);
        dailyForecasts[date].humidities.push(entry.main.humidity);
      });

      const box_2 = document.querySelector(".box_2");
      box_2.innerHTML = `
      <h1>${Object.keys(dailyForecasts).length - 1}-Day Forecast</h1>
      <div class="forecast-container"></div>
    `;

      const forecastContainer = document.querySelector(".forecast-container");

      Object.keys(dailyForecasts)
        .slice(1, 7)
        .forEach((date) => {
          const temps = dailyForecasts[date].temps;
          const avgTemp = Math.round(
            temps.reduce((sum, temp) => sum + temp, 0) / temps.length - 273.15
          );

          const description = dailyForecasts[date].descriptions[0];
          const iconCode = dailyForecasts[date].icons[0];
          const iconUrl = `./icons/${iconCode}.png`;

          forecastContainer.innerHTML += `
          <div class="forecast-day">
            <h2>${date}</h2>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>${avgTemp}°C</p>
            <p>${description}</p>
          </div>
        `;
        });

      const date = Object.keys(dailyForecasts)[0];
      const weatherContainer = document.querySelector(".container");
      const temps = dailyForecasts[date].temps;

      const temp = Math.round(
        temps.reduce((sum, temp) => sum + temp, 0) / temps.length - 273.15
      );
      const description = dailyForecasts[date].descriptions[0];
      const iconCode = dailyForecasts[date].icons[0];
      const iconUrl = `./icons/${iconCode}.png`;
      const humidity = dailyForecasts[date].humidities[0];
      const wind_speed = dailyForecasts[date].wind_speeds[0];
      const dateTime = dailyForecasts[date].dateTime[0];

      weatherContainer.innerHTML = `
      <h2>${dateTime}</h2>
      <img id="status_img" src="${iconUrl}" />
      <h2 id="temp">${temp}°C</h2>
      <h2 id="status_text">${description}</h2>
      <h2 id="humidity">Humidity : ${humidity}</h2>
      <h2 id="wind">Wind Speed : ${wind_speed}</h2>
      <h2 id="location">${data.city.name + ", " + data.city.country}</h2>
    `;
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}
