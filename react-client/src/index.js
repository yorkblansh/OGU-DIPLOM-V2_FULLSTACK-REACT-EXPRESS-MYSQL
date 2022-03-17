import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";

import CONFIG from "./CONFIG.json";

import App from "./COMPONENTS/App";

window.funcRequest = async (url, method = "GET", data = null) => {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";

      body = JSON.stringify(data);
    }

    let responseFetch = await fetch(`${CONFIG.URL_BACKEND}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    const { ok, status } = responseFetch;

    responseFetch = await responseFetch.json();

    const returnFetch = { ok, status, responseFetch };

    return returnFetch;
  } catch (err) {
    // console.error(err.message);
  }
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
