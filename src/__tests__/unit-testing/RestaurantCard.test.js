import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../react-redux/store";
import RestaurantCard, {
  withPromotedLabel,
} from "../../components/restaurant-card/RestaurantCard";
import MOCK_DATA from "../../utils/resCardMock.json";
import "@testing-library/jest-dom";

it("Should render RestaurantCard component with props", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <RestaurantCard restaurant={MOCK_DATA} />
      </Provider>
    </BrowserRouter>
  );

  const restrauName = screen.getByText(/Tossin Pizza/i);
  expect(restrauName).toBeInTheDocument();
});

const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

it("Should render RestaurantCard component with promoted label", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PromotedRestaurantCard restaurant={MOCK_DATA} />
      </Provider>
    </BrowserRouter>
  );

  const promotedLabel = screen.getByTestId("promoted-wrapper");
  expect(promotedLabel).toBeInTheDocument();
});
