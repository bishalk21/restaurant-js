import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../components/header/Header";
import { Provider } from "react-redux";
import store from "../../react-redux/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // 1. using getByRole to find the login button (and if multiple buttons) ---> best way to find buttons
  const loginButton = screen.getByRole("button", { name: /Login/i });

  // 2. using getByText to find the login button
  // const loginButton = screen.getByText(/Login/i);

  // 3.

  expect(loginButton).toBeInTheDocument();
});

it("Should render header component with a cart icon", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // a and class name - cart-icon
  const cartIcon = screen.getByRole("link", {
    name: "",
    hidden: true,
    class: "cart-icon",
  });
  expect(cartIcon).toBeInTheDocument();
});

it("Should change login button to Sign up button if clicked in sign up link", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: /Login/i });

  fireEvent.click(loginButton);

  const signUpButton = screen.getByRole("button", { name: /Sign up/i });
  expect(signUpButton).toBeInTheDocument();
});
