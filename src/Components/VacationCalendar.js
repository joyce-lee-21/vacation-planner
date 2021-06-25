import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { addDays } from "date-fns";
// import { first } from "lodash";

// API Key from https://rapidapi.com/community/api/open-weather-map/
// Sean's API key = "0629feec2bmsh3ef7f3d86a812b3p127915jsna97cfce97a10"

const API_KEY = "0629feec2bmsh3ef7f3d86a812b3p127915jsna97cfce97a10";
const API_HOST = "community-open-weather-map.p.rapidapi.com";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  date: {
    padding: theme.spacing(1),
    height: "40px",
    justifyContent: "flex-start",
    textAlign: "right",
    color: theme.palette.text.secondary,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  weather: {
    padding: theme.spacing(1),
    height: "40px",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  }
}));

const DAYS_PER_WEEK = 7;
const SECONDS_PER_DAY = 86400;
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

function VacationCalendar({ currentUser, page, vacationData, onWeatherClick}) {
  const classes = useStyles();

  const [forecastArray, setForecastArray] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [calendarFlipRemainder, setCalendarFlipRemainder] = useState(0);

  const city = vacationData.city
  // console.log(city)


  // this function generates an array of raw dates within the selected range
  let getDaysArray = function(start,end) {
    for (var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
    }
    return arr;
  }
  // this function maps all objects in array in converted date
  let dateArray = getDaysArray(new Date(vacationData.start), new Date(vacationData.end));
  // Thu Jun 24 2021 20:46:31 GMT-0500 (Central Daylight Time)
  // console.log(dateArray)
  let newDateArray = [];
  dateArray.forEach(date => {
    let convertedStartDate = new Date(date);
    let month = convertedStartDate.getMonth() + 1;
    let day = convertedStartDate.getDate();
    let year = convertedStartDate.getFullYear();
    let shortStartDate = month + "/" + day + "/" + year
    newDateArray.push(shortStartDate)
  })
  // newDateArray = array of formatted dates from user input
  // console.log(newDateArray)
    // console.log(typeof shortStartDate)
    // 6/25/2021 => string

  function leftPadWithEmptyObject(arr, seconds) {
    arr.unshift({ dt: seconds });
  }

  function buildForecastArray(forecast) {
    // console.log(forecast)
    let firstDayOfWeek = new Date(forecast[0].dt * 1000).getDay();
    setCurrentMonth(new Date(forecast[0].dt * 1000).getMonth());
    let secondsInFirstDay = forecast[0].dt;
    while (firstDayOfWeek > 0) {
      secondsInFirstDay -= SECONDS_PER_DAY;
      leftPadWithEmptyObject(forecast, secondsInFirstDay);
      firstDayOfWeek--;
    }
    // console.log(forecast)

    setForecastArray(forecast);
    setCalendarFlipRemainder(
      ((DAYS_PER_WEEK - 1) * SECONDS_PER_DAY + forecast[0].dt) %
        (SECONDS_PER_DAY * DAYS_PER_WEEK)
    );
  }
  // function isEndOfWeek(seconds) {
  //   return (
  //     seconds % (SECONDS_PER_DAY * DAYS_PER_WEEK) === calendarFlipRemainder
  //   );
  // }

  // function addCalendarPadding() {
  //   return (
  //     <>
  //       {/* You MUST do this in two steps */}
  //       <Grid item xs={3}></Grid>
  //       <Grid item xs={2}></Grid>
  //     </>
  //   );
  // }

  //filter dt to match dateArray
  useEffect(() => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city}&cnt=${dateArray.length+1}&units=imperial&mode=JSON`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST
        }
      }
    )
      .then((response) => response.json())
      .then((data) => buildForecastArray(data.list));
  }, []);

  function HeaderRow() {
    return (
      <Container>
        <Grid
          container 
          spacing={0}
          direction="row"
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader0">
              Sun
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader1">
              Mon
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader2">
              Tues
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader3">
              Wed
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader4">
              Thurs
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader5">
              Fri
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper} id="dayWeekHeader6">
              Sat
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Container>
    );
  }

  function DateRow1() {
    return (
      <>
        <Container>
          <Grid
            container 
            spacing={0}
            direction="row"
          >
            <Grid item xs={2}></Grid>
              {forecastArray.slice(0,7).map((daily) => {
                const conditions = daily.weather && daily.weather[0].icon;
                let date = new Date(daily.dt * 1000)
                let month = date.getMonth()+1
                let day = date.getDate();
                let year = date.getFullYear();
                let shortStartDate = month + "/" + day + "/" + year;
                return (
                  <Grid key={daily.dt} item xs={1}>
                    <Paper className={classes.date}>
                      {day}
                    </Paper>
                    <Paper key={daily.dt} className={classes.weather} onClick={() => onWeatherClick(daily.dt)}>
                      <div className="weather-elements">
                        <span className="temp-number">
                          {daily.temp
                            ? `${Math.round(daily.temp.day)}°`
                            : null}
                        </span>
                        {conditions && (
                          <img
                            src={`http://openweathermap.org/img/wn/${conditions}@2x.png`}
                            alt="weather-icon"
                            className="weather-icon"
                          />
                        )}
                      </div>
                    </Paper>
                  </Grid>
                )
              })}
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </>
    );
  }
  function DateRow2() {
    return (
      <>
        <Container>
          <Grid
            container 
            spacing={0}
            direction="row"
          >
            <Grid item xs={2}></Grid>
              {forecastArray.slice(7,14).map((daily) => {
                const conditions = daily.weather && daily.weather[0].icon;
                // const firstDay = forecastArray[0].dt;
                return (
                  <Grid key={daily.dt} item xs={1}>
                    <Paper className={classes.date}>
                      {new Date(daily.dt * 1000).getDate()}
                    </Paper>
                    <Paper key={daily.dt} className={classes.weather} onClick={() => onWeatherClick(daily.dt)}>
                      <div className="weather-elements">
                        <span className="temp-number">
                          {daily.temp
                            ? `${Math.round(daily.temp.day)}°`
                            : "no data"}
                        </span>
                        {conditions && (
                          <img
                            src={`http://openweathermap.org/img/wn/${conditions}@2x.png`}
                            alt="weather-icon"
                            className="weather-icon"
                          />
                        )}
                      </div>
                    </Paper>
                  </Grid>
                )
              })}
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </>
    );
  }
  function DateRow3() {
    return (
      <>
        <Container>
          <Grid
            container 
            spacing={0}
            direction="row"
          >
            <Grid item xs={2}></Grid>
              {forecastArray.slice(14,21).map((daily) => {
                const conditions = daily.weather && daily.weather[0].icon;
                // const firstDay = forecastArray[0].dt;
                return (
                  <Grid key={daily.dt} item xs={1}>
                    <Paper className={classes.date}>
                      {new Date(daily.dt * 1000).getDate()}
                    </Paper>
                    <Paper key={daily.dt} className={classes.weather} onClick={() => onWeatherClick(daily.dt)}>
                      <div className="weather-elements">
                        <span className="temp-number">
                          {daily.temp
                            ? `${Math.round(daily.temp.day)}°`
                            : "no data"}
                        </span>
                        {conditions && (
                          <img
                            src={`http://openweathermap.org/img/wn/${conditions}@2x.png`}
                            alt="weather-icon"
                            className="weather-icon"
                          />
                        )}
                      </div>
                    </Paper>
                  </Grid>
                )
              })}
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </>
    );
  }
  return (
    <div className="calendar-container">
      <h2>{MONTHS[currentMonth]}</h2>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={0}>
            <HeaderRow />
          </Grid>
          {forecastArray.length > 14
            ? (<>
                <Grid container item xs={12} spacing={0}>
                  <DateRow1 />
                </Grid>
                <Grid container item xs={12} spacing={0}>
                  <DateRow2 />
                </Grid>
                <Grid container item xs={12} spacing={0}>
                  <DateRow3 />
                </Grid>
              </>)
              : forecastArray.length > 7 && forecastArray.length <=14
                ? (<>
                    <Grid container item xs={12} spacing={0}>
                      <DateRow1 />
                    </Grid>
                    <Grid container item xs={12} spacing={0}>
                      <DateRow2 />
                    </Grid>
                  </>)
                  : forecastArray.length <=7
                    ? (<Grid container item xs={12} spacing={0}>
                        <DateRow1 />
                      </Grid>)
                      : null
          }
        </Grid>
      </div>
    </div>
  );
}

export default VacationCalendar;
