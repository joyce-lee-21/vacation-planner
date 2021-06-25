import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const API_KEY = "b288f1ae8dmshb2230bda90da38bp154b42jsneff76a56ba64";

// To render this component properly with updated data from db.json:
// 1. insert your API KEY above
// 2. add event listener to vacation calendar date to initiate setter function to update the selectedDate state through Content component (parent)
// 3. update the fetch URL with string interpolation of a user's city (make sure the appropriate prop is passed in). currently hard coded to Honolulu

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  weather: {
    padding: theme.spacing(3),
    height: "30px",
    alignContent: "center",
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  weather2: {
    padding: theme.spacing(3),
    height: "30px",
    alignContent: "center",
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  weather3: {
    padding: theme.spacing(1),
    height: "30px",
    alignContent: "center",
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  }
}));

export default function WeatherDetails({ currentUser, page, weatherDate, vacationCity }) {
  const [forecastArray, setForecastArray] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(1624744800);
  const MONTHS = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };
  const classes = useStyles();
  // console.log(vacationCity)


  useEffect(() => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${vacationCity}&cnt=16&units=imperial&mode=JSON`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => setForecastArray(data.list));
  }, []);

  let output = {
    date: "",
    max: 0,
    min: 0,
    icon: "",
    weather: "",
    sunrise: "",
    sunset: ""
  };

  {
    forecastArray.filter((daily) => {
      const conditions = daily.weather[0].icon;
      const conditionsText = daily.weather[0].description;
      const date = weatherDate;
      const srise = new Date(daily.sunrise * 1000);
      let riseHours = srise.getHours();
      let riseMinutes = "0" + srise.getMinutes();
      const sset = new Date(daily.sunset * 1000);
      let setHours = sset.getHours();
      let setMinutes = "0" + sset.getMinutes();
        let apiDate = new Date(daily.dt * 1000)
        let month = apiDate.getMonth()+1
        let day = apiDate.getDate();
        let year = apiDate.getFullYear();
        let shortStartDate = month + "/" + day + "/" + year;
        // console.log(shortStartDate)
        // console.log(daily)
      return shortStartDate === date
        ? (output = {
            date: MONTHS[apiDate.getMonth()] + " " + day + ", " + year,
            max: Math.round(daily.temp.max),
            min: Math.round(daily.temp.min),
            icon: (
              <img
                className="weather-icon2"
                src={`http://openweathermap.org/img/wn/${conditions}@2x.png`}
                alt="weather-icon"
              />
            ),
            weather: conditionsText,
            sunrise: riseHours + ":" + riseMinutes.substr(-2),
            sunset: setHours + ":" + setMinutes.substr(-2)
          })
        : "error";
    });
  }

  function WeatherExpanded() {
    // console.log(output)
    return (
      <>
        <React.Fragment>
          <Grid item xs={3}></Grid>
          <Grid item xs={2}>
            <Paper className={classes.weather}>Date:</Paper>
            <Paper className={classes.weather}>City:</Paper>
            <Paper className={classes.weather2}>Max / Min</Paper>
            <Paper className={classes.weather2}>Conditions:</Paper>
            <Paper className={classes.weather2}>Sunrise Time:</Paper>
            <Paper className={classes.weather3}>Sunset Time:</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.weather}>{output.date}</Paper>
            <Paper className={classes.weather}>{vacationCity}</Paper>
            <Paper className={classes.weather2}>
              {output.max}° / {output.min}°
            </Paper>
            <Paper className={classes.weather2}>
              <div className="weather-elements">
                <span className="temp-number2">{output.weather}</span>
                {output.icon}
              </div>
            </Paper>
            <Paper className={classes.weather2}>{output.sunrise}</Paper>
            <Paper className={classes.weather3}>{output.sunset}</Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </React.Fragment>
      </>
    );
  }
  return (
    <div className="calendar-container">
      <h2>Weather Detail by Day</h2>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={0}>
            <WeatherExpanded />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
