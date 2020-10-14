import React from 'react';

const WeatherCard = (props) => {
    const  { weather } = props;

    return (
        <div>
            {typeof(weather) !== 'undefined' ?
            <div>
            <h2>{weather.name}</h2>
            <h3>{weather.main.temp}</h3>
            <h4>Real Feel:{weather.main.feels_like}</h4>
            <h4>Pressure:{weather.main.pressure}</h4>
            <h4>Humidity:{weather.main.humidity}</h4>
            <h4>Min:{weather.main.temp_min}</h4>
            <h4>Max:{weather.main.temp_max}</h4>
            <h5>{weather.sys.country}</h5>
            </div> : <h2>Enter a city</h2>
            }
            
        </div>
    )
}

export default WeatherCard;