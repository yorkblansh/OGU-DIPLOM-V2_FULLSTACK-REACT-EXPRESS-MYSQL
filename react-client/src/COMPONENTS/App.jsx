import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Register from "./ACCOUNT/REGISTER/Register";
import Login from "./ACCOUNT/LOGIN/Login";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
