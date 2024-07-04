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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (data.cod !== 200) {
        document.getElementById('weather').innerText = 'Error fetching weather data';
    } else {
        const weatherData = `
            <h2>Weather in ${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather').innerHTML = weatherData;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const mode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', mode);
}
