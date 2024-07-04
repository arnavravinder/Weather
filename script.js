async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key_here';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (data.cod !== 200) {
        document.getElementById('weather').innerText = 'Error fetching weather data';
    } else {
        document.getElementById('weather').innerText = `
            Weather in ${data.name}: ${data.weather[0].description}
            Temperature: ${data.main.temp}°C
        `;
    }
}

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
