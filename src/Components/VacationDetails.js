import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

export default function VacationDetail({currentUser, page, onNewVacation}) {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  // const [vacationCity, setVacationCity] = useState("")

  const classes = useStyles();

  let vacationCity = "";

  const handleStartDateChange = (e) => {
    let startDate = e;
    let convertedStartDate = new Date(startDate);
    let month = convertedStartDate.getMonth() + 1;
    let day = convertedStartDate.getDate();
    let year = convertedStartDate.getFullYear();
    let shortStartDate = month + "/" + day + "/" + year;
    // console.log(typeof shortStartDate)
    // 6/25/2021 => string
    setSelectedStartDate(shortStartDate);
  };

  const handleEndDateChange = (e) => {
    let endDate = e;
    let convertedEndDate = new Date(endDate);
    let month = convertedEndDate.getMonth() + 1;
    let day = convertedEndDate.getDate();
    let year = convertedEndDate.getFullYear();
    let shortEndDate = month + "/" + day + "/" + year;
    setSelectedEndDate(shortEndDate);
  };

  const handleVacationInput = (e) => {
    // console.log(e.target.parentNode.vacationCity.value);
    vacationCity = e.target.parentNode.vacationCity.value
  };

  const onVacationSubmit = (e) => {
    e.preventDefault()
    onNewVacation({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      city: vacationCity,
      userId: currentUser.id
    })
  }

  function VacationDetails() {
    return (
      <Box m={2}>
        <Grid className="container1" container item xs={12}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="startdate-picker-inline"
                label="Start Date"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="enddate-picker-inline"
                label="End Date"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)}
                maxDateMessage="Forecast of 16 days max allowed."
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <form>
              <br></br>
              <label>City: </label>
                <input
                  type="text"
                  name="vacationCity"
                  size="30"
                  placeholder="City Name"
                  onChange={e => handleVacationInput(e)}
                />
                <br></br>
                <br></br>
                <Link
                  to="/vacationcalendar"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="secondary" onClick={onVacationSubmit}>
                    Add Vacation
                  </Button>
                </Link>
            </form>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
    </Box>
    )
  }

  return (
    <div className="vacation-details-container">
      <h2>Enter New Vacation Details</h2>
      <div className={classes.root}>
        <Grid item xs={12}>
          <VacationDetails />
        </Grid>
      </div>
    </div>
  );
}
