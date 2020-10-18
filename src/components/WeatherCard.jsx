import React from 'react';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';

const Container = styled(Paper) `
    margin: 0 auto;
    text-align:center;
    max-width:600px;
    min-width:350px;
    background-color: #0093E9;
    background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    @media (max-width:768px){
        min-width:320px;
    }
`

const IconDescription = styled.h4 `
    margin-top:0;
`

const WeatherCard = (props) => {
    const {currentWeather, imperialUnit, location} = props;

    const{
        name: city,
        sys: {country},
        main: {temp : temperature},
        main: {feels_like},
        main: {pressure},
        main: {humidity},
        main: {temp_min},
        main: {temp_max},
    } = currentWeather

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const iconSrc = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
    const unit = imperialUnit ? 'F°' : 'C°';

    return (
        <Container elevation={3}>
            <img src={iconSrc} alt=''></img>
            <IconDescription>{capitalizeFirstLetter(currentWeather.weather[0].description)}</IconDescription>
            <h2>{location ? `${location.standard.city}, ${location.standard.prov}` : `${city}, ${country}` }</h2>
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