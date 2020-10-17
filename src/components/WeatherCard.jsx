import React from 'react';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';

const Container = styled(Paper) `
    margin: 0 auto;
    text-align:center;
    max-width:600px;
    min-width:350px;
`

const WeatherCard = (props) => {
    const {currentWeather, imperialUnit} = props;
    
    const{
        name: city,
        sys: {country},
        main: {temp : temperature},
        main: {feels_like},
        main: {pressure},
        main: {humidity},
        main: {temp_min},
        main: {temp_max}
    } = currentWeather

    const iconSrc = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
    const unit = imperialUnit ? 'F°' : 'C°';

    return (
        <Container elevation={3} >
            <img src={iconSrc} alt=''></img>
            <h2>{city}, {country}</h2>
            <h3>{temperature} {unit}</h3>
            <h4>Real Feel: {feels_like} {unit}</h4>
            <h4>Pressure: {pressure} hPa</h4>
            <h4>Humidity: {humidity}%</h4>
            <h4>Min: {temp_min} {unit}</h4>
            <h4>Max: {temp_max} {unit}</h4>
        </Container>
    )
}

export default WeatherCard;