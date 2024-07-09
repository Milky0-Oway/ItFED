const responseSuccess = (type) => (response) => {
    if(response.ok) {
        switch(type) {
            case 'url':
                return response.url;
            default:
                return response.json();
        };
    } else {
        throw Error();
    }
};

const hideEl = (el) => {
    if(el.classList.contains('d-block')) {
        el.classList.replace('d-block', 'd-none');
    } else if(!el.classList.contains('d-none')) {
        el.classList.add('d-none')
    }
};

const showEl = (el) => {
    el.classList.replace('d-none', 'd-block');
};

const resetTextContent  = (el) => {
    el.textContent = '';
}

const getWeather = () => {
    const userInputElement = document.getElementById('user-input');
    const errorMessageElement = document.getElementById('error-message');
    const weatherIconElement = document.getElementById('weather-icon');
    const city = userInputElement.value;
    const weatherTempElement = document.getElementById('weather-temp');
    const weatherCityElement = document.getElementById('weather-city');
    const wetherDescriptionElement = document.getElementById('weather-description');
    const weatherHumidityIconElement = document.getElementById('weather-humidity-icon');
    const weatherHumidityTextElement = document.getElementById('weather-humidity-text');
    const weatherWindIconElement = document.getElementById('weather-wind-icon');
    const weatherWindTextElement = document.getElementById('weather-wind-text');
    const errorMessage = 'Something went wrong! Try again!'

    const reset = () => {
        hideEl(weatherIconElement);
        hideEl(weatherHumidityIconElement);
        hideEl(weatherWindIconElement);
        resetTextContent(errorMessageElement);
        resetTextContent(weatherHumidityTextElement);
        resetTextContent(weatherWindTextElement);
        resetTextContent(wetherDescriptionElement);
        resetTextContent(weatherCityElement);
        resetTextContent(weatherTempElement);
    }

    const displayWeather = (data) => {
        const temperature = Math.round(data.main.temp - 273.15)
        weatherTempElement.innerHTML = `${temperature}&deg;C`;
        weatherCityElement.textContent = data.name;
        wetherDescriptionElement.innerText = data.weather[0].description;

        showEl(weatherHumidityIconElement);
        weatherHumidityTextElement.textContent = `${data.main.humidity}%`;

        showEl(weatherWindIconElement);
        weatherWindTextElement.textContent = `${Math.round(data.wind.speed)} m/s`;
    }

    reset();

    if(!city) {
        errorMessageElement.textContent = errorMessage;
        return;
    }

    const apiKey = 'a65a1e774b7be0c440be5fdbaddfafb5'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(responseSuccess('json'))
        .then((data) => {
            displayWeather(data);
            const iconCode = data.weather[0].icon;

            return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
        })
        .then(responseSuccess('url'))
        .then((iconUrl) => {
            weatherIconElement.setAttribute('src', iconUrl);
            showEl(weatherIconElement);
        })
        .catch((e) => {
            errorMessageElement.textContent = errorMessage;
            console.error(e);
        })
}