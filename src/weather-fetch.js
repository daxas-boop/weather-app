const fetchWeather = async (location, imperialUnit) => {
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
    const APIKEY = '&appid=30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit ? 'imperial' : 'metric';

    const response = await fetch(URL + location.replace(/ +(?= )/g,'').trim() + '&units=' + unit + APIKEY);
    if(!response.ok){
        throw new Error('Something went wrong');
    } else {
        const result = await response.json();
        return result;
    }
}

export default fetchWeather;