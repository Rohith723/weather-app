async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "5efc7bbb833616468b48501796388b79"; // Replace with your OpenWeatherMap API key
  const resultBox = document.getElementById("weatherResult");

  resultBox.classList.remove("show"); // Reset animation

  if (!city) {
    resultBox.innerHTML = `<p>Please enter a city name.</p>`;
    resultBox.classList.add("show");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultBox.innerHTML = `<p>${data.message}</p>`;
      resultBox.classList.add("show");
      return;
    }

    const { name, main, weather, wind } = data;

    resultBox.innerHTML = `
      <h2>${name}</h2>
      <p>${weather[0].main} - ${weather[0].description}</p>
      <p>🌡️ Temperature: ${main.temp} °C</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
    `;

    // Delay adding animation class for smooth re-render
    setTimeout(() => resultBox.classList.add("show"), 100);

  } catch (error) {
    resultBox.innerHTML = `<p>Error fetching weather data</p>`;
    resultBox.classList.add("show");
    console.error(error);
  }
}
