function attachEvents() {
    
    let locationCode = '';

    const locationInput = document.querySelector('#location');
    const submitButton = document.querySelector('#submit');

    /* submitButton.addEventListener('click', function() {

        fetch('https://judgetests.firebaseio.com/locations.json')
            .then(res => res.json())
            .then(locations => {

                for (let key in locations) {
                        
                    if (locations[key].name == locationInput.value) locationCode = locations[key].code;
                }

                if (locationCode.length > 0) return fetch(`https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`);
            })
            .then(res => res.json())
            .then(locationObj => {

                document.querySelector('#forecast').style.display = 'block';

                createTodayForecast(locationObj);

                return fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`);
            })
            .then(res => res.json())
            .then(locationObj => locationObj.forecast.forEach(el => createUpcomingForecast(el)))
            .catch(() => {

                document.querySelector('#forecast').textContent = 'Error';
                document.querySelector('#forecast').style.display = 'block';
            });
    }) */

    submitButton.addEventListener('click', async function() {

        try {

            let res = await fetch('https://judgetests.firebaseio.com/locations.json');
            const locations = await res.json();

            for (let key in locations) {

                if (locations[key].name !== locationInput.value) continue;

                const locationCode = locations[key].code;

                getTodayForecast(locationCode);
                getUpcomingForecast(locationCode);

                /* fetch(`https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`)
                    .then(res => res.json())
                    .then(locationObj => {
                        document.querySelector('#forecast').style.display = 'block';
                        createTodayForecast(locationObj);
                    })
                    .catch(err => console.log(err))

                fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`)
                    .then(res => res.json())
                    .then(locationObj => locationObj.forecast.forEach(el => createUpcomingForecast(el)))
                    .catch(err => console.log(err)) */

                return;
            }

            throw new Error('Error');
        }
        catch (e) {

            document.querySelector('#forecast').textContent = e.message;
            document.querySelector('#forecast').style.display = 'block';
        }
    })
}

async function getTodayForecast(locationCode) {

    try {
        const res = await fetch(`https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`);
        const locationObj = await res.json();

        document.querySelector('#forecast').style.display = 'block';
        createTodayForecast(locationObj);
    }
    catch (e) {
        console.log(e.message);
    }
}

async function getUpcomingForecast(locationCode) {
    
    try {
        const res = await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`);
        const locationObj = await res.json();

        locationObj.forecast.forEach(el => createUpcomingForecast(el))
    }
    catch (e) {
        console.log(e.message);
    }
}

function createTodayForecast(obj) {

    const currentForecast = document.querySelector('#current');
    const forecasts = document.createElement('div');
    forecasts.classList.add('forecasts');

    const conditionSymbol = document.createElement('span');
    conditionSymbol.classList.add('condition-symbol');

    if (obj.forecast.condition == 'Sunny') conditionSymbol.innerHTML = '&#x2600;';
    else if (obj.forecast.condition == 'Partly sunny') conditionSymbol.innerHTML = '&#x26C5;';
    else if (obj.forecast.condition == 'Overcast') conditionSymbol.innerHTML = '&#x2601;';
    else if (obj.forecast.condition == 'Rain') conditionSymbol.innerHTML = '&#x2614;';

    const conditionSpan = document.createElement('span'); 
    conditionSpan.classList.add('condition');

    const locationSpan = document.createElement('span');
    locationSpan.classList.add('forecast-data');
    locationSpan.textContent = obj.name;

    const degreesSpan = document.createElement('span');
    degreesSpan.classList.add('forecast-data');
    degreesSpan.textContent = `${obj.forecast.low}°/${obj.forecast.high}°`;

    const weatherSpan = document.createElement('span');
    weatherSpan.classList.add('forecast-data');
    weatherSpan.textContent = obj.forecast.condition;

    conditionSpan.appendChild(locationSpan);
    conditionSpan.appendChild(degreesSpan);
    conditionSpan.appendChild(weatherSpan);

    forecasts.appendChild(conditionSymbol);
    forecasts.appendChild(conditionSpan);

    currentForecast.appendChild(forecasts);
}

function createUpcomingForecast(obj) {

    const parent = document.querySelector('#upcoming');

    const forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-info');

    const upcomingSpan = document.createElement('span');
    upcomingSpan.classList.add('upcoming');

    const symbolSpan = document.createElement('span');
    symbolSpan.classList.add('symbol');

    if (obj.condition == 'Sunny') symbolSpan.innerHTML = '&#x2600;';
    else if (obj.condition == 'Partly sunny') symbolSpan.innerHTML = '&#x26C5;';
    else if (obj.condition == 'Overcast') symbolSpan.innerHTML = '&#x2601;';
    else if (obj.condition == 'Rain') symbolSpan.innerHTML = '&#x2614;'
    const degreesSpan = document.createElement('span');
    degreesSpan.classList.add('forecast-data');
    degreesSpan.textContent = `${obj.low}°/${obj.high}°`;

    const weatherSpan = document.createElement('span');
    weatherSpan.classList.add('forecast-data');
    weatherSpan.textContent = obj.condition;

    upcomingSpan.appendChild(symbolSpan);
    upcomingSpan.appendChild(degreesSpan);
    upcomingSpan.appendChild(weatherSpan);

    if (parent.children.length == 1) {

        forecastInfo.appendChild(upcomingSpan);

        parent.appendChild(forecastInfo);
    }
    else {

        document.querySelector('.forecast-info').appendChild(upcomingSpan);
    }
}

attachEvents();