import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./components/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
