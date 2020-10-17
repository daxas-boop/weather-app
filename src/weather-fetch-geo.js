const fetchFunction = async (geolocation, location, imperialUnit) => {
    let lat;
    let lon;

    if (geolocation) {
        lat = geolocation[0];
        lon = geolocation[1];
    } else {
        const KEY = '12038227860412e15757698x95258';
        location = location.replace(/ +(?= )/g,'').trim();
        const geolocation = await fetch (`https://geocode.xyz/${location}?json=1&auth=${KEY}`)
        .then(r => r.json())
        .then(r => { 
            if(r.error) { // this api only returns error with an object response.error
                throw new Error(r.error) 
            } else {
                return r
            }
        })
        .catch(e => { throw new Error(e) }) // just in case

        lat = geolocation.latt;
        lon = geolocation.longt;
    }

    const URL = 'http://api.openweathermap.org/data/2.5/';
    const APIKEY = '30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';

    const currentWeather = await fetch (`${URL}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${APIKEY}`)
    .then(r => {
        if (!r.ok) {
            throw Error(r.statusText);
        } else {
            return r.json()
        }
    })

    const forecast = await fetch (`${URL}onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly&appid=${APIKEY}`)
    .then(r => {
        if (!r.ok) {
            throw Error(r.statusText);
        } else {
            return r.json()
        }
    })
    
    forecast.daily.shift(0); // removes current day on forecast
    return {currentWeather ,forecast};
}

export default fetchFunction;