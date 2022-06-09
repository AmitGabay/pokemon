import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App";
import "./index.css";

if (localStorage.user) axios.defaults.headers.Authorization = localStorage.user;

if ("serviceWorker" in navigator) {
  // register service worker (PWA)
  navigator.serviceWorker.register("service-worker.js");
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
