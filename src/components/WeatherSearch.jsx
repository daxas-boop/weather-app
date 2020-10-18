import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { useFetchOnClick } from '../hooks/useFetchOnClick';
import Loading from './Loading/Loading';
import Forecast from './Forecast';
import WeatherCard from './WeatherCard';
import fetchFunction from '../handle-fetch';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {keyframes} from '@emotion/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Error from './Error/Error'

const useStyles = makeStyles((theme) => ({
  locationBtn:{
    position: 'absolute',
    right: 10,
    top:10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const wind = keyframes `
    0% {
    background-position: 0 200px, 0 300px, 100px 250px;
    }
    100% {
        background-position: 1000px 200px, 1200px 300px, 1100px 250px;
    }
`

const Container = styled.section `
    margin:0 auto;
    min-height:100vh;
    display:flex;
    flex-direction: column;
    font-family:'Roboto';
    position:relative;
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
`

const SearchForm = styled(Paper) `
    margin:50px auto;
    margin-top:75px;
    padding: 2px 4px;
    display: flex;
    align-items: center;
    width: 400px;
    @media (max-width:768px) {
        margin-top:75px;
        width:310px;
    }
`

const SwitchContainer = styled.label `
    display:flex;
    align-items:center;
    position:absolute;
    top:10px;
    left:10px;
`

const AnimationWrapper = styled.div `
    display:flex;
    flex-direction: column;
    font-family:'Roboto';
    position:relative;
    min-height:100vh;
    background: url(https://static.radulescu.me/examples/clouds/clouds1000.png);
    background: url(https://static.radulescu.me/examples/clouds/clouds1000.png) 0 200px,
                url(https://static.radulescu.me/examples/clouds/clouds1200_1.png) 0 300px,
                url(https://static.radulescu.me/examples/clouds/clouds1000_blur3.png) 100px 250px;
    animation: ${wind} 120s linear infinite;
`

const WeatherSearch = () => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [imperialUnit, setimperialUnit] = useState(true);
    const { data, loading, error } = useFetchOnClick(fetchFunction, searchTerm, imperialUnit);
    const classes = useStyles();

    function successGeo(pos) {
        setSearchTerm([pos.coords.latitude, pos.coords.longitude])
    }

    function errorGeo(e) {
        console.log(e)
    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    }, [])

    function handleGeolocationClick(){
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    }

    function handleUnitChange() {
        setimperialUnit(!imperialUnit);
    }

    return (
        <Container>
            <AnimationWrapper>
                <SearchForm 
                component="form" 
                className={classes.root} 
                onSubmit={ (e) => {e.preventDefault();} }>
                    <InputBase
                            className={classes.input}
                            placeholder="Search city"
                            inputProps={{ 'aria-label': 'Search city' }}
                            onChange={(e) => {setInput(e.target.value)}} value={input}
                        />
                    <IconButton
                        type="submit" 
                        className={classes.iconButton} 
                        aria-label="search"
                        onClick={ () => {setSearchTerm(input)} }
                    >
                        <SearchIcon />
                    </IconButton>
                </SearchForm> 

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.locationBtn}
                    endIcon={<LocationOnIcon />}
                    onClick={ () => handleGeolocationClick() }
                >
                    Find me
                </Button>

                <SwitchContainer>
                    <Grid item>F°</Grid>
                    <Grid item>
                        <Switch onChange={() => {handleUnitChange()} } value={imperialUnit} color="default" />
                    </Grid>
                    <Grid item>C°</Grid>
                </SwitchContainer>

                {loading && <Loading/>}
                {error && <Error 
                    error= {error}
                />}
                {data &&
                    <>
                        <WeatherCard
                            currentWeather = {data.currentWeather}
                            location = {data.geolocation}
                            imperialUnit = {imperialUnit}
                        />
                        <Forecast 
                            forecast = {data.forecast}
                            imperialUnit = {imperialUnit}
                        />
                    </>
                }
            </AnimationWrapper>
        </Container>
    )
}

export default WeatherSearch;
