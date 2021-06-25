import React, { useState } from "react";
import MyInfo from "./MyInfo";
import VacationDetails from "./VacationDetails";
import VacationCalendar from "./VacationCalendar";
import WeatherDetails from "./WeatherDetails";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";

export default function Content({
  currentUser,
  allVacations,
  page,
  onLoginSubmit,
  onForgotPasswordSubmit,
  onIsUserNameAvailable,
  onAddUser,
  onAddVacation,
  onLogout
}) {
  
  const [calendarArray, setCalendarArray] = useState([])
  const [vacation, setVacation] = useState([])
  const [weatherDate, setWeatherDate] = useState("")

  const VACATIONS_API = "http://localhost:3000/vacations";
  const HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const submitVacation = (newVacationObj) => {
    setVacation(newVacationObj)
    fetch(VACATIONS_API, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newVacationObj
        // startDate: vacation.start,
        // endDate: vacation.end,
        // userId: currentUser.id,
        // city: vacationCity
      )
    })
      .then((response) => response.json())
      .then((newVacationObj) => onAddVacation(newVacationObj))
    alert("New vacation added");
  };
  // console.log(vacation)

  const onVacationSelect = (vac) => {
    let city = vac.city
    setVacation({
      start: vac.startDate,
      end: vac.endDate,
      city: vac.city
    })
  }

  const onWeatherClick = (date) => {
    let convertedWeatherDate = new Date(date * 1000);
    let month = convertedWeatherDate.getMonth() + 1;
    let day = convertedWeatherDate.getDate();
    let year = convertedWeatherDate.getFullYear();
    let shortWeatherDate = month + "/" + day + "/" + year;
    setWeatherDate(shortWeatherDate);
  };

  return (
    <div>
      <Switch>
        <Route path="/myinfo/">
          <MyInfo
            currentUser={currentUser}
            page={page}
            allVacations={allVacations}
            onVacationSelect={onVacationSelect}
          />
        </Route>
        <Route path="/vacationdetails/">
          <VacationDetails 
            currentUser={currentUser} 
            page={page} 
            onNewVacation={submitVacation}
          />
        </Route>
        <Route path="/vacationcalendar/">
          <VacationCalendar 
            currentUser={currentUser} 
            page={page} 
            onWeatherClick={onWeatherClick} 
            vacationData={vacation} 
            calendarArray={calendarArray}
          />
          {weatherDate && (
            <WeatherDetails
              currentUser={currentUser}
              page={page}
              weatherDate={weatherDate}
              vacationCity={vacation.city}
            />
          )}
        </Route>
        <Route exact path="/">
          <Home
            currentUser={currentUser}
            page={page}
            onLoginSubmit={onLoginSubmit}
            onForgotPasswordSubmit={onForgotPasswordSubmit}
            onIsUserNameAvailable={onIsUserNameAvailable}
            onAddUser={onAddUser}
            onLogout={onLogout}
          />
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
        </Route>
      </Switch>
    </div>
  );
}
