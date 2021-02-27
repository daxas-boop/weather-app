import React, { useState, useEffect } from 'react';
import { useFetchOnClick } from '../hooks/useFetchOnClick';
import fetchFunction from '../handle-fetch';
import MainWeather from '../components/MainWeather';
import Forecast from '../components/Forecast';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading/Loading';
import Error from '../components/Error/Error';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  text-align: center;
`;

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [imperialUnit, setimperialUnit] = useState(true);
  const { data, loading, error } = useFetchOnClick(fetchFunction, searchTerm, imperialUnit);

  function successGeo(pos) {
    setSearchTerm([pos.coords.latitude, pos.coords.longitude]);
  }

  function errorGeo(e) {
    console.log(e);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  }, []);

  function handleGeolocationChange() {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  }

  function handleUnitChange() {
    setimperialUnit(!imperialUnit);
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  return (
    <Container>
      <Navbar
        handleUnitChange={handleUnitChange}
        handleGeolocationChange={handleGeolocationChange}
        imperialUnit={imperialUnit}
      />
      <SearchBar handleSearch={handleSearch} />
      {loading && <Loading />}
      {error && <Error />}
      {data && (
        <>
          <MainWeather
            currentWeather={data.currentWeather}
            location={data.geolocation}
            imperialUnit={imperialUnit}
          />
          <hr style={{ width: '85%', marginTop: '50px' }}></hr>
          <h2 style={{ color: 'white', fontSize: '2.8rem' }}>Forecast</h2>
          <Forecast forecast={data.forecast} imperialUnit={imperialUnit} />
          <footer style={{ color: 'white', margin: '15px 0' }}>
            Data provided by{' '}
            <a
              style={{ color: 'lavender' }}
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenWeather API
            </a>
          </footer>
        </>
      )}
    </Container>
  );
}
