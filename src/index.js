import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { ParamsProvider } from "./components/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParamsProvider>
      <App />
    </ParamsProvider>
  </React.StrictMode>
);
reportWebVitals();
