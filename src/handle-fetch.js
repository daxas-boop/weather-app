const handleFetch = async (searchTerm, imperialUnit) => {
    if (Array.isArray(searchTerm)) {
        const lat = searchTerm[0];
        const lon = searchTerm[1];
        const {currentWeather, forecast} = await fetchWeatherGeolocation(lat, lon, imperialUnit);
        return {currentWeather, forecast};
    } else if (typeof searchTerm === 'string') {
        const {currentWeather, forecast} = await fetchWeatherSearchInput(searchTerm, imperialUnit);
        return {currentWeather, forecast};
    }
}

async function fetchWeatherSearchInput(searchTerm, imperialUnit) {
    const APIKEY = '30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';

    const currentWeatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${unit}&appid=${APIKEY}`);
    const currentWeather = await currentWeatherPromise.json();
    const lat = currentWeather.coord.lat;
    const lon = currentWeather.coord.lon;

    const forecastPromise = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly&appid=${APIKEY}`);
    const forecast = await forecastPromise.json();

    forecast.daily.shift(0); // removes current day on forecast
    return {currentWeather, forecast};
}


async function fetchWeatherGeolocation(lat, lon, imperialUnit) {
    const APIKEY = '30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';

    const currentWeatherPromise = fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${APIKEY}`)
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Something went wrong');
    }})

    const forecastPromise = fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly&appid=${APIKEY}`)
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Something went wrong');
    }})

    let currentWeather, forecast;
    try {
        const response = await Promise.all([currentWeatherPromise, forecastPromise]);
        currentWeather = response[0];
        forecast = response[1]
    } catch (error) {
        throw new Error(error)
    }
    
    forecast.daily.shift(0); // removes current day on forecast
    return {currentWeather, forecast};
}

export default handleFetch;
