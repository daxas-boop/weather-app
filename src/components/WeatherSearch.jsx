import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { useFetchOnChange } from '../hooks/useFetchOnChange';
import { useFetchOnClick } from '../hooks/useFetchOnClick';
import fetchWeather from '../weather-fetch';
import Loading from'./Loading';

const Container = styled.section `
    margin:0 auto;
    max-width:1080px;
    min-height:100vh;
    display:flex;
    flex-direction: column;
    font-family:'Roboto';
    background-color:#eee;
    position:relative;
`

const SearchForm = styled.form `
    margin:10px auto;
    display:flex;
    flex-direction:column;
    text-align:center;
    @media (max-width:768px) {
        margin-top:50px;
    }
`

const SearchButton = styled.button  `
    font-family:'Roboto';
    font-size:16px;
    margin: 0 auto;
    margin-top:5px;
    padding: 0.3em 0.5em;
    &:hover{
        cursor:pointer;
    }
`

const SwitchContainer = styled.label `
    display:flex;
    align-items:center;
    position:absolute;
    top:5px;
    left:15px;
`

const WeatherCard = styled.article `
    margin: 0 auto;
    text-align:center;
`

const WeatherSearch = () => {
    const [searchInput, setSearchInput] = useState('');
    const [imperialUnit, setimperialUnit] = useState(true);
    const { data, loading, error } = useFetchOnChange(fetchWeather, searchInput, imperialUnit, 500);
    // const { onClick, state } = useFetchOnClick(fetchWeather, searchInput, imperialUnit);

    function handleUnitChange() {
        setimperialUnit(!imperialUnit);
    }
    
    // const { data, loading, error } = state;
    
    return (
        <Container>
            <SearchForm onSubmit={ (e) => {e.preventDefault();} }>
                <label>Search city</label>
                <input type='text' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                <SearchButton 
                    // onClick={ () => onClick() }
                >Search</SearchButton>
            </SearchForm>

            
            <SwitchContainer>
                <Grid item>F°</Grid>
                <Grid item>
                    <Switch onChange={ handleUnitChange } value={imperialUnit} color="default" />
                </Grid>
                <Grid item>C°</Grid>
            </SwitchContainer>
            

            {loading && <Loading/>}
            {data  && 
            <WeatherCard>
                <h2>{data.name}</h2>
                <h3>{data.main.temp} {imperialUnit ? 'F°' : 'C°'}</h3>
                <h4>Real Feel: {data.main.feels_like} {imperialUnit ? 'F°' : 'C°'}</h4>
                <h4>Pressure: {data.main.pressure} hPa</h4>
                <h4>Humidity: {data.main.humidity}%</h4>
                <h4>Min: {data.main.temp_min} {imperialUnit ? 'F°' : 'C°'}</h4>
                <h4>Max: {data.main.temp_max} {imperialUnit ? 'F°' : 'C°'}</h4>
                <h5>Country: {data.sys.country}</h5>
            </WeatherCard> 
            }
            {error && <h1>Error</h1>}
        </Container>
    )
}

export default WeatherSearch;
