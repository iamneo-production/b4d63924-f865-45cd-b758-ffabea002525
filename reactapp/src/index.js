import React from "react";
import ReactDOM from "react-dom";
import { RailProvider } from "./components/context/context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <RailProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </RailProvider>,
  document.getElementById("root")
);
reportWebVitals();
