import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Register from "./ACCOUNT/REGISTER/Register";
import Login from "./ACCOUNT/LOGIN/Login";

const STATUS_ACCOUNT = {
  ACCOUNT_NO_AUTH: 0,
  ACCOUNT_AUTH: 1,
};

const App = () => {
  const [statusAccount, setStatusAccount] = useState(
    STATUS_ACCOUNT.ACCOUNT_NO_AUTH
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/account/register"
          element={
            statusAccount === STATUS_ACCOUNT.ACCOUNT_NO_AUTH ? <Register /> : ""
          }
        />
        <Route
          path="/account/login"
          element={
            statusAccount === STATUS_ACCOUNT.ACCOUNT_NO_AUTH ? (
              <Login
                setStatusAccount={setStatusAccount}
                STATUS_ACCOUNT={STATUS_ACCOUNT}
              />
            ) : (
              ""
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
