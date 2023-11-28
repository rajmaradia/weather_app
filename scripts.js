async function getSunriseSunset() {
    const locationInput = document.getElementById('locationInput').value;

    try {
        // Use the geocode API to get latitude and longitude
        const geocodeResponse = await fetch(`https://geocode.maps.co/?q=${locationInput}`);
        const geocodeData = await geocodeResponse.json();
        const { lat, lon } = geocodeData.results[0].geometry;

        // Use latitude and longitude to get sunrise and sunset times
        const sunriseSunsetResponse = await fetch(`https://api.sunrise-sunset.io/json?lat=${lat}&lng=${lon}&formatted=0`);
        const sunriseSunsetData = await sunriseSunsetResponse.json();

        // Update the dashboard with the response data
        updateDashboard(sunriseSunsetData);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateDashboard(data) {
    const resultContainer = document.getElementById('resultContainer');
    const today = document.getElementById('today');
    const tomorrow = document.getElementById('tomorrow');

    // Update Today's data
    updateDayData(today, data.results);

    // Update Tomorrow's data
    updateDayData(tomorrow, data.results, true);

    // Show the result container
    resultContainer.classList.remove('hidden');
}

function updateDayData(dayElement, data, isTomorrow = false) {
    const prefix = isTomorrow ? 'tomorrow' : 'today';

    dayElement.querySelector(`#${prefix}Sunrise`).innerText = `Sunrise: ${new Date(data.sunrise).toLocaleTimeString()}`;
    dayElement.querySelector(`#${prefix}Sunset`).innerText = `Sunset: ${new Date(data.sunset).toLocaleTimeString()}`;
    dayElement.querySelector(`#${prefix}Dawn`).innerText = `Dawn: ${new Date(data.dawn).toLocaleTimeString()}`;
    dayElement.querySelector(`#${prefix}Dusk`).innerText = `Dusk: ${new Date(data.dusk).toLocaleTimeString()}`;
    dayElement.querySelector(`#${prefix}DayLength`).innerText = `Day Length: ${data.day_length} hours`;
    dayElement.querySelector(`#${prefix}SolarNoon`).innerText = `Solar Noon: ${new Date(data.solar_noon).toLocaleTimeString()}`;
    dayElement.querySelector(`#${prefix}TimeZone`).innerText = `Time Zone: ${data.timezone}`;
}
