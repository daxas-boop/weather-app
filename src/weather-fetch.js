const fetchWeather = async (location, imperialUnit) => {
    const URL = 'http://api.openweathermap.org/data/2.5/';
    const APIKEY = '&appid=30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';
    location = location.replace(/ +(?= )/g,'').trim();

    const weatherPromise = fetch(URL + 'weather?q=' + location + '&units=' + unit + APIKEY)
    .then(r => {
        if (!r.ok) {
            throw Error(r.statusText);
        } else {
            return r.json()
        }
    })

    const forecastPromise = fetch(URL + 'forecast/?q=' + location + '&units=' + unit + APIKEY)
    .then(r => {
        if (!r.ok) {
            throw Error(r.statusText);
        } else {
            return r.json()
        }
    })

    const [weather, forecast] = await Promise.all([weatherPromise, forecastPromise])
 
    return {weather, forecast};
}

export default fetchWeather;