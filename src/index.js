// this is using createBrowserRouter
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./router/appRouter";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} fallbackElement={<NotFoundPage />} />
  </React.StrictMode>
);
