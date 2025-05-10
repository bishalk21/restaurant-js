import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <div className="app">
      <h1>Hamro Bhojan</h1>
      <p>Welcome to Hamro Bhojan, your go-to app for delicious recipes!</p>
    </div>
  </React.StrictMode>
);
