document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.weather-app');
    const temp = document.querySelector('.temp');
    const dateOutput = document.querySelector('.date');
    const timeOutput = document.querySelector('.time');
    const conditionOutput = document.querySelector('.condition');
    const nameOutput = document.querySelector('.name');
    const icon = document.querySelector('.icon');
    const cloudOutput = document.querySelector('.cloud');
    const humidityOutput = document.querySelector('.humidity');
    const windOutput = document.querySelector('.wind');
    const windDegree = document.querySelector('.winddegree');
    const windDirection = document.querySelector('.windirection');
    const gustKph = document.querySelector('.gustkph');
    const rainyPercentage = document.querySelector('.rain');
    const form = document.getElementById('locationInput');
    const search = document.querySelector('.search');
    const btn = document.querySelector('.submit');
    const cities = document.querySelectorAll('.city');
    const countryOutput = document.querySelector('.country');
    const continent = document.querySelector('.continent');
    const regionOutput = document.querySelector('.region'); // New element for region
    const forecastTemp = document.querySelector('.forecast-temp'); // Element for forecast temperature

    let cityInput = "Bukit Kokol";

    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            cityInput = e.target.innerHTML;
            fetchWeatherData();
            app.style.opacity = "0";
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (search.value.length === 0) {
            alert('Please type in the city name');
        } else {
            cityInput = search.value;
            fetchWeatherData();
            search.value = "";
            app.style.opacity = "0";
        }
    });

    function dayofTheWeek(day, month, year) {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[new Date(`${day}/${month}/${year}`).getDay()];
    }

    function fetchWeatherData() {
        fetch(`http://api.weatherapi.com/v1/current.json?key=5d5ad657c7fb438593555948242610&q=${cityInput}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
    
                temp.innerHTML = data.current.temp_c + "&#176;";
                conditionOutput.innerHTML = data.current.condition.text;
    
                const date = data.location.localtime;
                const y = parseInt(date.substr(0, 4));
                const d = parseInt(date.substr(5, 2));
                const m = parseInt(date.substr(8, 2));
                const time = date.substr(11);
    
                dateOutput.innerHTML = `${dayofTheWeek(d, m, y)} ${d}, ${m} ${y}`;
                timeOutput.innerHTML = time;
                nameOutput.innerHTML = data.location.name;
    
                icon.src = "https:" + data.current.condition.icon;
    
                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + "km/h";
                rainyPercentage.innerHTML = data.current.precip_mm + "%";
                windDegree.innerHTML = data.current.wind_degree + "°";
                windDirection.innerHTML = data.current.wind_dir;
                gustKph.innerHTML = data.current.gust_kph + "km/h";
                regionOutput.innerHTML = data.location.region; // Set region data
                continent.innerHTML = data.location.tz_id;
                countryOutput.innerHTML = data.location.country;

                // Set forecast temperature from heat_index_c
                forecastTemp.innerHTML = data.current.feelslike_c + "&#176;C";

                WindSpeedCaution(data.current.wind_kph); 

                let timeofDay = "day";
                if (!data.current.is_day) {
                    timeofDay = "night";
                }
    
                const code = data.current.condition.code;
                const videoElement = document.querySelector('.back-video'); 
    
                if (code === 1000) {
                    videoElement.src = `./images/${timeofDay}/clear.mp4`;
                    btn.style.background = "#e5ba92";
                    if (timeofDay === "night") btn.style.background = "#181e27";
                } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
                    videoElement.src = `./images/${timeofDay}/cloudy.mp4`;
                    btn.style.background = "#fa6d1b";
                    if (timeofDay === "night") btn.style.background = "#181e27";
                } else {
                    videoElement.src = `./images/${timeofDay}/rainy.mp4`;
                    btn.style.background = "#4d72aa";
                    if (timeofDay === "night") btn.style.background = "#1b1b1b";
                }
    
                videoElement.load(); 
                app.style.opacity = "1";
            })
            .catch(() => {
                alert('City not found, please try again');
                app.style.opacity = "1";
            });
    }

    function WindSpeedCaution(windSpeed) {
        if (windSpeed >= 34) {
            document.getElementById("wind").style.color = "red";
        }
        else if (windSpeed >= 13 && windSpeed <= 33) {
            document.getElementById("wind").style.color = "yellow";
        }
        else {
            document.getElementById("wind").style.color = "white";
        }
    }

    fetchWeatherData();
    app.style.opacity = "1";
});
