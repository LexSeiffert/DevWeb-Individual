import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Contador from "./pages/Contador";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Contador />
  </React.StrictMode>
);
