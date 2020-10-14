import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard'

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    console.log(data)
  })

  const searchOnClick = async (location, imperialUnit) => {
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
    const APIKEY = '&appid=30d2d7664fe7b2ac7e54fdca4bc7f915';
    const unit = imperialUnit === true ? 'imperial' : 'metric';

    try{
      const response = await fetch(URL + location + '&units=' + unit + APIKEY)
      const result = await response.json()
      setData(result);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header 
        onClick = {searchOnClick}
      />
      <WeatherCard 
        weather = {data}
      />
    </div>
  );
}

export default App;
