import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { useFetchOnClick } from '../hooks/useFetchOnClick';
import fetchWeather from '../weather-fetch';
import Loading from'./Loading';
import Forecast from './Forecast';
import WeatherCard from './WeatherCard';

const Container = styled.section `
    margin:0 auto;
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



const WeatherSearch = () => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [imperialUnit, setimperialUnit] = useState(true);
    const { data, loading, error } = useFetchOnClick(fetchWeather, searchTerm, imperialUnit);

    function handleUnitChange() {
        setimperialUnit(!imperialUnit);
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container>
            <SearchForm onSubmit={ (e) => {e.preventDefault();} }>
                <label>Search city</label>
                <input type='text' onChange={(e) => setInput(e.target.value) } value={input} />
                <SearchButton 
                    onClick={ () => setSearchTerm(input) }
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
            {error && <h1>Error</h1>}
            {data &&
                <>
                    <WeatherCard
                        weather = {data.weather}
                        imperialUnit = {imperialUnit}
                    />
                    <Forecast 
                        forecast = {data.forecast}
                        imperialUnit = {imperialUnit}
                    />
                </>
            }
        </Container>
    )
}

export default WeatherSearch;
