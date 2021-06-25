import React from "react";
import LoginPage from "./LoginPage";

export default function Home({
  currentUser,
  onForgotPasswordSubmit,
  onNewUserClick,
  onLoginSubmit,
  onUserNameChange,
  onPasswordChange,
  onIsUserNameAvailable,
  onAddUser,
  onLogout
}) {
  function handleLogOutClick() {
    onLogout();
  }
  const loggedInMessage = (
    <div>
      You are logged in<button onClick={handleLogOutClick}>Log Out</button>
    </div>
  );
  const loginPage = (
    <LoginPage
      onUserNameChange={onUserNameChange}
      onPasswordChange={onPasswordChange}
      onLoginSubmit={onLoginSubmit}
      onForgotPasswordSubmit={onForgotPasswordSubmit}
      onNewUserClick={onNewUserClick}
      onIsUserNameAvailable={onIsUserNameAvailable}
      onAddUser={onAddUser}
    />
  );
  const pageToDisplay = currentUser ? loggedInMessage : loginPage;
  return <div>{pageToDisplay}</div>;
}
