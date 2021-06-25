import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function MyInfo({ currentUser, allVacations, onVacationSelect }) {
  const [showPassword, toggleShowPassWord] = useState(false);

  function handleShowPasswordClick() {
    toggleShowPassWord(!showPassword);
  }
  const displayedVacations = allVacations?.filter(
    (vac) => vac.userId === currentUser?.id
  );

  const handleVacationSelect = (vac) => {
    onVacationSelect(vac)
  }
  return (
    <>
      <div>
        {currentUser ? `Hello, ${currentUser.userName}.` : `Please Log In.`}
      </div>
      {currentUser && <h3>Vacations Saved</h3>}
      <ul style={{listStyleType: 'none'}}>
        {displayedVacations?.map((vac) => (
          <>
          <Link to="/vacationcalendar" style={{ textDecoration: "none" }}>
            <li key={vac.id} onClick={() => handleVacationSelect(vac)}>{vac.city}</li>
          </Link>
          </>
        ))}
      </ul>
      <ul style={{listStyleType: 'none'}}>
        {currentUser && (
          <div key={currentUser.id}>
            <li>First Name: {currentUser.firstName ?? "Anonymous"}</li>
            <li>Last Name: {currentUser.lastName ?? "Anonymous"}</li>
            <li>Username: {currentUser.userName}</li>
            <button onClick={handleShowPasswordClick}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            {showPassword && <div>Password: {currentUser.password} </div>}
          </div>
        )}
      </ul>
    </>
  );
}
