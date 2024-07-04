document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    VanillaTilt.init(document.querySelector('.container'), {
        max: 25,
        speed: 400
    });

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        document.body.classList.add(savedMode);
        if (savedMode === 'dark-mode') {
            document.getElementById('darkModeToggle').checked = true;
        }
    }
});

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key_here';
    const loader = document.getElementById('loader');
    const weatherDiv = document.getElementById('weather');
    
    loader.style.display = 'block';
    weatherDiv.innerHTML = '';
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod !== 200) {
            weatherDiv.innerText = 'Error fetching weather data';
        } else {
            const weatherData = `
                <h2>Weather in ${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <div class="weather-detail">
                    <p><span>Pressure</span>${data.main.pressure} hPa</p>
                    <p><span>Visibility</span>${data.visibility} m</p>
                </div>
                <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            `;
            weatherDiv.innerHTML = weatherData;
        }
    } catch (error) {
        weatherDiv.innerText = 'Error fetching weather data';
    } finally {
        loader.style.display = 'none';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const mode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', mode);
}
