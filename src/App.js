import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./components/AppLayout";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
);
