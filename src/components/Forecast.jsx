import React,{useEffect,useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

const Container = styled(Grid) `
    max-width:100%;
    margin-top:20px;
`

const Day = styled(Paper) `
    width:200px;
    text-align:center;
    background-color:blue;
    padding:10px;
`

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container:{
    margin:0,
    marginTop:20,
  }
}));

const Forecast = (props) => {
    const classes = useStyles();
    const {forecast, imperialUnit} = props;
    const [days, setDays] = useState([]);
    const [expanded, setExpanded] = useState({});

    const handleExpandClick = (index) => {
        expanded.hasOwnProperty(index) ? setExpanded({...expanded, [index]: !expanded[index]}) :
        setExpanded({ ...expanded, [index]: true } )
    };
    
    useEffect(() => {
        // Split array into arrays of matching values. 
        // So that way we can have an array for each day of the weak. Thank you stackoverflow.
        let groupedByDate = Object.values(forecast.list
        .reduce((acc, x)=>{
            let arr = acc[x.dt_txt.substr(0,x.dt_txt.indexOf(' '))] || [];
            arr.push(x);
            acc[x.dt_txt.substr(0,x.dt_txt.indexOf(' '))] = arr;
            return acc;
        },{}));

        setDays(groupedByDate);
    }, [forecast])

    const unit = imperialUnit ? 'F°' : 'C°';

    // needs mapping
    console.log(days);
    
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
            {days.map(
                (day,index) => 
                <Grid key={day[0].dt_txt} item>
                    <Day elevation={3}>
                        <h2>{day[0].dt_txt.substr(0,day[0].dt_txt.indexOf(' '))}</h2>
                        {day.slice(0,3).map(hour =>
                            <div key={hour.dt_txt} style={{display:'flex'}}>
                                <p>{hour.dt_txt.substr(hour.dt_txt.indexOf(' ')+1)}</p>
                                <p>{hour.main.temp} {unit}</p>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                                    alt={hour.weather[0].main}>    
                                </img>
                            </div>
                        )}
                        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                            {day.slice(3).map(hour =>
                                <div key={hour.dt_txt + 'hidden'} style={{display:'flex'}}>
                                    <p>{hour.dt_txt.substr(hour.dt_txt.indexOf(' ')+1)}</p>
                                    <p>{hour.main.temp} {unit}</p>
                                    <img 
                                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                                        alt={hour.weather[0].main}>    
                                    </img>
                                </div>
                            )}
                        </Collapse>
                         <IconButton
                            className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded[index],
                            })}
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expanded[index]}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                     </Day>
                </Grid>
            )}
        </Container>
    )
}

export default Forecast;