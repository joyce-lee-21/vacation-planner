import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../App.css";
import Header from "./Header";
import Content from "./Content";

const USERS_API = "http://localhost:3000/users";
const VACATIONS_API = "http://localhost:3000/vacations";

function App() {
  const [page, setPage] = useState("/");
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allVacations, setAllVacations] = useState([]);

  function handleLoginSubmit(event) {
    event.preventDefault();
    console.log(allVacations);
    let currentUserName = event.target.userName.value;
    let currentPassword = event.target.password.value;
    let foundUserWithPassword = allUsers.find(
      (user) =>
        user.userName === currentUserName && user.password === currentPassword
    );
    let foundUser = allUsers.find((user) => user.userName === currentUserName);
    foundUserWithPassword
      ? setCurrentUser(foundUserWithPassword)
      : foundUser
      ? alert("Wrong Password. Please Try Again or click forgot password.")
      : alert("Username not found. Please Try Again or click new user button.");
    //let currentUser;
    //setUser(currentUser);
  }

  function handleForgotPasswordSubmit(event) {
    event.preventDefault();
    console.log(event.target.userName.value);
    console.log(event.target.favoriteCity.value);
    let currentUserName = event.target.userName.value;
    let currentFavCity = event.target.favoriteCity.value;
    let foundUserWithFavCity = allUsers.find(
      (user) =>
        user.userName === currentUserName &&
        user.favoriteCity === currentFavCity
    );
    console.log(foundUserWithFavCity);
    let foundUser = allUsers.find((user) => user.userName === currentUserName);
    foundUserWithFavCity
      ? alert(`Your password is ${foundUserWithFavCity.password}`)
      : foundUser
      ? alert("Wrong Favorite City. Please Try Again.")
      : alert("Username not found. Please Try Again or click new user button.");
    //let currentUser;
    //setUser(currentUser);
  }

  function isUserNameAvailable(newUserName) {
    return !allUsers.find((user) => user.userName === newUserName);
  }

  function handleAddUser(newUser) {
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  function handleAddVacation(newVacation) {
    setAllVacations([...allVacations, newVacation])
  }
  // console.log(allVacations)

  function loadUsers() {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((users) => setAllUsers(users))
      .catch((err) => console.log(err));
  }

  function loadVacations() {
    fetch(VACATIONS_API)
      .then((res) => res.json())
      .then((vacations) => setAllVacations(vacations))
      .catch((err) => console.log(err));
  }

  useEffect(loadUsers, []);
  useEffect(loadVacations, []);

  return (
    <div className="App">
      <Header></Header>
      <NavBar onChangePage={setPage} />
      <Content
        currentUser={currentUser}
        allVacations={allVacations}
        page={page}
        onLoginSubmit={handleLoginSubmit}
        onForgotPasswordSubmit={handleForgotPasswordSubmit}
        onIsUserNameAvailable={isUserNameAvailable}
        onAddUser={handleAddUser}
        onAddVacation={handleAddVacation}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
