import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    marginTop: 20,
  },
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Container = styled(Grid)`
  max-width: 100%;
  margin-top: 20px;
`;

const Day = styled(Paper)`
  width: 200px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 10px;
`;

const DateDay = styled.span`
  display: flex;
  justify-content: center;
`;

const Data = styled.span`
  display: inline-block;
  width: 100%;
  margin: 2px 0;
`;

const IconImage = styled.img`
  width: 50px;
`;

const IconDescription = styled.span`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const DataContainer = styled.div`
  text-align: center;
`;

const Forecast = (props) => {
  const classes = useStyles();
  const { forecast, imperialUnit } = props;

  function getDate(date) {
    let d = new Date(date * 1000);
    const dayMonth = +(d.getMonth() + 1) + '/' + d.getDate();

    switch (d.getDay()) {
      case 0:
        return 'Sunday ' + dayMonth;
      case 1:
        return 'Monday ' + dayMonth;
      case 2:
        return 'Tuesday ' + dayMonth;
      case 3:
        return 'Wednesday ' + dayMonth;
      case 4:
        return 'Thursday ' + dayMonth;
      case 5:
        return 'Friday ' + dayMonth;
      case 6:
        return 'Saturday ' + dayMonth;
      default:
        break;
    }
  }

  function getSunrise(sunrise) {
    let d = new Date(sunrise * 1000);
    return d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  }

  function getIcon(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const unit = imperialUnit ? 'F°' : 'C°';

  return (
    <Container
      className={classes.container}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
      m={2}
    >
      {forecast.daily.map((day) => (
        <Grid key={day.dt} item>
          <Day className={classes.root} elevation={3}>
            <DateDay>{getDate(day.dt)}</DateDay>
            <IconImage src={getIcon(day.weather[0].icon)} alt={day.weather[0].main} />
            <IconDescription>{capitalizeFirstLetter(day.weather[0].description)}</IconDescription>
            <DataContainer>
              <Data>
                Max: {day.temp.max} {unit}
              </Data>
              <Data>
                Min: {day.temp.min} {unit}
              </Data>
              <Data>Humidity: {day.humidity}%</Data>
              <Data>Pressure: {day.pressure}</Data>
              <Data>Sunrise: {getSunrise(day.sunrise)}</Data>
              <Data>Sunset: {getSunrise(day.sunset)}</Data>
            </DataContainer>
          </Day>
        </Grid>
      ))}
    </Container>
  );
};

export default Forecast;
