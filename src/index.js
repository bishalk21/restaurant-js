// this is using createBrowserRouter
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./router/appRouter";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { Provider } from "react-redux";
import store from "./react-redux/store";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} fallbackElement={<NotFoundPage />} />
    </Provider>
  </React.StrictMode>
);
