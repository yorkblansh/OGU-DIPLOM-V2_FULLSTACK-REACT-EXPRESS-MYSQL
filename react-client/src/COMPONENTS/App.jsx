import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import MainPage from "./MAINPAGE/MainPage";

import AccountAuthorized from "./ACCOUNT/ACCOUNTAUTHORIZED/AccountAuthorized";

import Register from "./ACCOUNT/REGISTER/Register";
import Login from "./ACCOUNT/LOGIN/Login";
import Profile from "./ACCOUNT/PROFILE/Profile";

const STATUS_ACCOUNT = {
  ACCOUNT_NO_AUTH: 0,
  ACCOUNT_AUTH: 1,
};

const App = () => {
  const [statusAccount, setStatusAccount] = useState(
    STATUS_ACCOUNT.ACCOUNT_NO_AUTH
  );
  const [profileUser, setProfileUser] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/account/register"
          element={
            statusAccount === STATUS_ACCOUNT.ACCOUNT_NO_AUTH ? (
              <Register />
            ) : (
              <AccountAuthorized />
            )
          }
        />
        <Route
          path="/account/login"
          element={
            statusAccount === STATUS_ACCOUNT.ACCOUNT_NO_AUTH ? (
              <Login
                setStatusAccount={setStatusAccount}
                STATUS_ACCOUNT={STATUS_ACCOUNT}
                setProfileUser={setProfileUser}
              />
            ) : (
              <AccountAuthorized />
            )
          }
        />
        <Route
          path="/account/profile"
          element={
            <Profile
              setProfileUser={setProfileUser}
              profileUser={profileUser}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
