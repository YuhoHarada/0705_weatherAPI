const result = document.getElementById("result")
const nameMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

fetch('https://api.openweathermap.org/data/2.5/weather?q=Tokyo&APPID=fe0cdd95e182e5d4f060da5d5c9df070')
    .then(response => response.json())
    .then((data) => { 
        console.log(data)
        let now = new Date()
        let offsetMs = now.getTimezoneOffset() * 60000
        let ortTime = new Date(now.getTime() + data.timezone * 1000 + offsetMs)
        let sunrise = new Date((data.sys.sunrise + data.timezone) * 1000 + offsetMs)
        let sunset = new Date((data.sys.sunset + data.timezone) * 1000 + offsetMs)
        let windDeg = "error"
        if (data.wind.deg <= 45 || data.wind.deg > 315) {
            windDeg = "North"
        } else if (data.wind.deg > 45 && data.wind.deg <= 135) {
            windDeg = "East"
        } else if (data.wind.deg > 135 && data.wind.deg <= 225) {
            windDeg = "South"
        } else if (data.wind.deg > 225 && data.wind.deg <= 315) {
            windDeg = "West"
        }

        result.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <h2>${ortTime.getDate()}. ${nameMonth[ortTime.getMonth()]} ${ortTime.getFullYear()}</h2>
        <h3>${(data.main.temp - 273.15).toFixed(1)} <span class="grad">°C</span></h3>
        <h4>${data.weather[0].description}</h4>
        <p>
        <span class="left">Max Temp</span>
        ${(data.main.temp_max-273.15).toFixed(1)} °C<br>
        <span class="left">Min Temp</span>
        ${(data.main.temp_min - 273.15).toFixed(1)} °C<br>
        <span class="left">Wind</span>
        ${data.wind.speed} m/s, ${windDeg}(${data.wind.deg})<br>
        <span class="left">Pressure</span>
        ${data.main.pressure} hpa<br>
        <span class="left">Humidity</span>
        ${data.main.humidity} %<br>
        <span class="left">Local time</span> 
        ${("0" + ortTime.getHours()).slice(-2)}:${("0" + ortTime.getMinutes()).slice(-2)}<br>
        <span class="left">Sunrise</span>
        ${("0" + sunrise.getHours()).slice(-2)}:${("0" + sunrise.getMinutes()).slice(-2)}<br>
        <span class="left">Sunset</span>
        ${("0" + sunset.getHours()).slice(-2)}:${("0" + sunset.getMinutes()).slice(-2)}<br>
        </p>
        `
    })
