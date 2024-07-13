const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const cityHide = document.querySelector(".city-hide");
const forecastRow = document.querySelector(".forecast-row");

search.addEventListener("click", () => {
  const APIKey = "75e02cf97bd2193757fdd1d37ab5dee6";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
   .then((response) => response.json())
   .then((json) => {
      const image = weatherBox.querySelector("img");
      const temperature = weatherBox.querySelector(".temperature");
      const description = weatherBox.querySelector(".decription");
      const humidity = weatherDetails.querySelector(".humidity span");
      const wind = weatherDetails.querySelector(".wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "/Assets/images/clear.png";
            break;
          case "Rain":
            image.src = "/Assets/images/rain.png";
            break;
          case "Snow":
            image.src = "/Assets/images/snow.png";
            break;
          case "Clouds":
            image.src = "/Assets/images/cloud.png";
            break;
          case "Mist":
            image.src = "/Assets/images/mist.png";
            break;
          case "Haze":
            image.src = "/Assets/images/mist.png";
            break;
          default:
            image.src = "/Assets/images/cloud.png";
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // 3-day forecast
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`
        )
         .then((response) => response.json())
         .then((json) => {
            const forecastDays = json.list.slice(0, 3);
            forecastRow.innerHTML = "";
            forecastDays.forEach((day, index) => {
              const forecastDay = document.createElement("div");
              forecastDay.className = "forecast-day";
              forecastDay.innerHTML = `
                <p>${index === 0? "Today" : index === 1? "Tomorrow" : "In 2 days"}</p>
                <img src="/Assets/images/${getWeatherIcon(day.weather[0].main)}.png" alt="" />
                <p class="forecast-temp">${parseInt(day.main.temp)}°C</p>
              `;
              forecastRow.appendChild(forecastDay);
            });
          });
      }
    });
});

function getWeatherIcon(weather) {
  switch (weather) {
    case "Clear":
      return "clear";
    case "Rain":
      return "rain";
    case "Snow":
      return "snow";
    case "Clouds":
      return "cloud";
    case "Mist":
      return "mist";
    case "Haze":
      return "mist";
    default:
      return "cloud";
  }
}