import React from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import { DateTime } from 'luxon';

const SubHeader = styled.h3`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.p`
  color: white;
  font-size: 5rem;
  margin: 0.5em 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallText = styled.p`
  text-align: center;
  color: grey;
  font-size: 0.8rem;
`;

const Box = styled(Paper)`
  width: 200px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 10px;
`;

const MainWeather = (props) => {
  const { currentWeather, imperialUnit, geolocation } = props;
  console.log(currentWeather);

  const {
    name: city,
    sys: { country },
    main: { temp: temperature },
    main: { feels_like },
    main: { pressure },
    main: { humidity },
    main: { temp_min },
    main: { temp_max },
    clouds: { all },
  } = currentWeather;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const iconSrc = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
  const unit = imperialUnit ? 'F' : 'C';

  return (
    <section>
      <SubHeader>
        <LocationOnOutlinedIcon fontSize="small" />
        {geolocation ? `${geolocation.standard.city}, ${geolocation.standard.prov}` : `${city}, ${country}`}
      </SubHeader>
      <Flex>
        <Header>{Math.round(temperature)}°</Header>
        <img src={iconSrc} alt=""></img>
      </Flex>
      <SubHeader style={{ marginTop: '0' }}>
        {capitalizeFirstLetter(currentWeather.weather[0].description)}
      </SubHeader>
      <SmallText>Updated: {DateTime.now().toFormat('FF')}</SmallText>
      <Box></Box>
    </section>
  );
};

export default MainWeather;
