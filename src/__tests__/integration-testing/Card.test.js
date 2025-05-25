// import { fireEvent, render, screen } from "@testing-library/react";
// import { act } from "react";
// import RestaurantMenus from "../../pages/restaurant-menu/RestaurantMenus";
// import { Provider } from "react-redux";
// import store from "../../react-redux/store";
// import { BrowserRouter } from "react-router-dom";
// // import { useRestaurants } from "../../context/RestaurantContext";
// import { MOCK_DATA } from "../../utils/resMenusMock.json";
// import HomePageContext from "../../pages/home/HomePageContext";
// import RestaurantCard from "../../components/restaurant-card/RestaurantCard";
// import {
//   RestaurantProvider,
//   useRestaurants,
// } from "../../context/RestaurantContext";

// //    TypeError: Cannot destructure property 'restaurants' of '((cov_mol91woxh(...).s[1]++) , (0 , _RestaurantContext.useRestaurants)(...))' as it is undefined.

// jest.mock("../../context/RestaurantContext", () => ({
//   useRestaurants: jest.fn(),
//   RestaurantProvider: ({ children }) => <div>{children}</div>,
//   withPromotedLabel: (Component) => (props) =>
//     (
//       <div className="promoted-wrapper">
//         <div className="promoted-label">
//           <span data-testid="promoted-wrapper">Promoted</span>
//         </div>
//         <Component {...props} />
//       </div>
//     ),

//   MOCK_DATA: jest.fn(() => ({
//     restaurants: MOCK_DATA,
//     setRestaurants: jest.fn(),
//     isLoading: false,
//     error: null,
//     refetchRestaurants: jest.fn(),
//   })),
// }));

// import fetchMock from "jest-fetch-mock";
// // Enable fetch mocking
// fetchMock.enableMocks();

// // Mock the fetch function to return the mock data

// global.fetch = jest.fn(() => {
//   return Promise.resolve({
//     json: () => {
//       return Promise.resolve(MOCK_DATA);
//     },
//   });
// });

// describe("Card Component Integration Test", () => {
//   // Mock the useRestaurants hook to return the mock data
//   beforeEach(() => {
//     // settimeout to load the mock data
//     jest.useFakeTimers();
//     jest.advanceTimersByTime(1000); // Simulate a delay for the mock data to load
//     // Mock the useRestaurants hook

//     useRestaurants.mockReturnValue({
//       restaurants: jest.fn(() => {
//         return Promise.resolve({
//           json: () => {
//             return Promise.resolve(MOCK_DATA);
//           },
//         });
//       }),
//       setRestaurants: jest.fn(),
//       isLoading: false,
//       error: null,
//       refetchRestaurants: jest.fn(),
//     });
//     console.log("beforeEach: useRestaurants mock set up");
//   });

//   beforeEach(() => {
//     // jest.clearAllMocks();
//     fetchMock.resetMocks();
//     console.log("beforeEach: Fetch mock reset");
//   });

//   afterEach(() => {
//     // Clear the fetch mock after each test
//     fetchMock.resetMocks();
//     console.log("afterEach: Fetch mock reset");
//   });

//   beforeAll(() => {
//     // Mock the fetch function to return the mock data
//     fetchMock.mockResponseOnce(JSON.stringify(MOCK_DATA));
//     console.log("beforeAll: Fetch mock set up with mock data");
//   });
//   afterAll(() => {
//     // Clear the fetch mock after all tests
//     fetchMock.resetMocks();
//     console.log("afterAll: Fetch mock reset");
//   });

//   //   it("should render RestaurantMenu Component", async () => {
//   //     await act(async () =>
//   //       render(
//   //         <Provider store={store}>
//   //           <RestaurantProvider>
//   //             <BrowserRouter>
//   //               <RestaurantCard restaurant={MOCK_DATA} />
//   //             </BrowserRouter>
//   //           </RestaurantProvider>
//   //         </Provider>
//   //       )
//   //     );

//   //     const accordHeader = await screen.getByText(/biryani/i);
//   //     fireEvent.click(accordHeader);

//   //     expect(screen.getAllByTestId("menu-item")).toBe(3);

//   //     const addBtn = screen.getByRole("button", {
//   //       name: /Add/i,
//   //     });

//   //     fireEvent.click(addBtn[0]);

//   //     const cartItems = screen.getByTestId("cart-items");
//   //     expect(cartItems).toBeInTheDocument();
//   //     expect(cartItems).toHaveTextContent("1 item(s) in cart");
//   //   });
// });
