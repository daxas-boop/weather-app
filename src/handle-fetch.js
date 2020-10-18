const handleFetch = async (searchTerm, imperialUnit) => {

    if (Array.isArray(searchTerm)) {
        const lat = searchTerm[0];
        const lon = searchTerm[1];
        const {currentWeather, forecast} = await fetchWeather(lat, lon, imperialUnit);
        return {currentWeather, forecast};

    } else if (typeof searchTerm === 'string') {
        const geolocation = await fetchGeolocation(searchTerm);
        const lat = geolocation.latt;
        const lon = geolocation.longt;
        const {currentWeather, forecast} = await fetchWeather(lat, lon, imperialUnit);
        return {currentWeather, forecast, geolocation};
    }
}


async function fetchGeolocation(searchTerm) {
    const KEY = '12038227860412e15757698x95258';
    searchTerm = searchTerm.replace(/ +(?= )/g,'').trim();
    let geolocation;

    try{
        const response = await fetch (`https://geocode.xyz/${searchTerm}?json=1&auth=${KEY}`);
        const responseJSON = await response.json();
        geolocation = responseJSON;
    } catch(error) {
        throw new Error(error)
    }

    if (geolocation.error) throw new Error(geolocation.error.description); // this api handles not found this way
    return geolocation;
}


async function fetchWeather(lat, lon, imperialUnit) {
    const APIKEY = '30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';

    const currentWeatherPromise = fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${APIKEY}`).then(r => r.json())

    const forecastPromise = fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly&appid=${APIKEY}`).then(r => r.json())

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
