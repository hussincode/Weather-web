document.addEventListener("DOMContentLoaded", () => {
    const apikey = "71d7063502b0235a3df6dee3579be820";

    async function checkWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
        const response = await fetch(apiUrl);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-info").style.display = "none";
        } else {
            var data = await response.json();
            console.log(data);
            document.querySelector("#city-name").innerText = data.name;
            document.querySelector("#temperature").innerText = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerText = data.main.humidity + "% Humidity";
            document.querySelector(".wind").innerText = Math.round(data.wind.speed * 3.6) + " km/h";

            if (data.weather[0].main === "Clouds") {
                document.querySelector(".weather-icon").src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                document.querySelector(".weather-icon").src = "images/clear.png";
            } else if (data.weather[0].main === "Rain") {
                document.querySelector(".weather-icon").src = "images/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                document.querySelector(".weather-icon").src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                document.querySelector(".weather-icon").src = "images/mist.png";
            }

            document.querySelector(".weather-info").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    }

    const searchBox = document.getElementById("city-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});