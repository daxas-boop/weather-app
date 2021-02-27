import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import { DateTime } from 'luxon';
import TurbinesIcon from '../icons/turbines.svg';
import HumidityIcon from '../icons/humidity.svg';
import CloudsIcon from '../icons/clouds.svg';
import VisibilityIcon from '../icons/visibility.svg';
import PressureIcon from '../icons/pressure.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  })
);

const SubHeader = styled.h3`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.p`
  color: white;
  font-size: 4.5rem;
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
  font-size: 0.6rem;
  margin: 0 5px;
`;

const Box = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin: 20px 0px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 20px 10px;
  width: 100%;
  max-width: 100%;
  @media (min-width: 550px) {
    width: 60%;
  }
`;

const Hr = styled.p`
  font-weight: 600;
  margin: 0 10px;
  margin-bottom: 6px;
  color: white;
  font-size: 0.8rem;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Conditions = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const MainWeather = (props) => {
  const classes = useStyles();
  const { currentWeather, geolocation } = props;

  const {
    name: city,
    sys: { country },
    main: { temp: temperature },
    main: { pressure },
    main: { humidity },
    clouds: { all },
    visibility,
    wind: { speed },
  } = currentWeather;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // 03d.png
  const iconSrc = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

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

      <FlexCenter>
        <Box className={classes.root}>
          <Conditions>
            <Icon src={HumidityIcon}></Icon>
            <div>
              <Hr>Humidity</Hr>
              <SmallText>{humidity}%</SmallText>
            </div>
          </Conditions>
          <Conditions>
            <Icon src={CloudsIcon}></Icon>
            <div>
              <Hr>Clouds</Hr>
              <SmallText>{all}%</SmallText>
            </div>
          </Conditions>
          <Conditions>
            <Icon src={VisibilityIcon}></Icon>
            <div>
              <Hr>Visibility</Hr>
              <SmallText>{visibility} Km</SmallText>
            </div>
          </Conditions>
        </Box>
        <Box className={classes.root}>
          <Conditions>
            <Icon src={TurbinesIcon}></Icon>
            <div>
              <Hr>Wind</Hr>
              <SmallText>{speed} Km/h</SmallText>
            </div>
          </Conditions>
          <Conditions>
            <Icon src={PressureIcon}></Icon>
            <div>
              <Hr>Pressure</Hr>
              <SmallText>{pressure} hPa</SmallText>
            </div>
          </Conditions>
        </Box>
      </FlexCenter>
    </section>
  );
};

export default MainWeather;
