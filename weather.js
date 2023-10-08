document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '1f00439ee97798e2303455ede6f2fec8';
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');

    getWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value;

        if (city) {
            const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    if (data.current) {
                        const weatherDescription = data.current.weather_descriptions[0];
                        const temperature = data.current.temperature;
                        const weatherHTML = `
                            <h2>Weather in ${city}</h2>
                            <p>Weather: ${weatherDescription}</p>
                            <p>Temperature: ${temperature}°C</p>
                        `;
                        weatherInfo.innerHTML = weatherHTML;
                    } else {
                        weatherInfo.innerHTML = '<p>No weather data available.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
                });
        }
    });
});
