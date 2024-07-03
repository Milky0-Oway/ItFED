const getWeather = () => {
    const userInputElement = document.getElementById('user-input');
    const errorMessageElement = document.getElementById('error-message');
    const weatherIconElement = document.getElementById('weather-icon');
    const city = userInputElement.value;
    const errorMessage = 'Something went wrong! Try again!'

    // Validation of the input value
    if(!city) {
        errorMessageElement.textContent = errorMessage;
    }

    errorMessageElement.textContent = '';

    const apiKey = 'a65a1e774b7be0c440be5fdbaddfafb5'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error();
            }
        })
        .then((data) => {
            const iconCode = data.weather[0].icon;

            return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
        })
        .then((response) => {
            if(response.ok) {
                return response.url;
            } else {
                throw Error();
            }
        })
        .then((iconUrl) => {
            weatherIconElement.setAttribute('src', iconUrl)
            weatherIconElement.setAttribute('alt', 'Weather icon')
        })
        .catch((e) => {
            errorMessageElement.textContent = errorMessage;
            console.error(e);
        })
}