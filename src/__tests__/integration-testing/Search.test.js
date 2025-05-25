import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createMemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import store from "../../react-redux/store";
import Header from "../../components/header/Header";
import { MOCK_DATA } from "../../utils/resCardMock.json";
import { act } from "react";
import { MainLayout } from "../../router/appRouter";
import HomePageContext from "../../pages/home/HomePageContext";
import RestaurantMenus from "../../pages/restaurant-menu/RestaurantMenus";
import CartPage from "../../pages/cart/CartPage";
import AboutPage from "../../pages/about/AboutPage";
import ContactPage from "../../pages/contact/ContactPage";
import { RestaurantProvider } from "../../context/RestaurantContext";

jest.mock("../../context/RestaurantContext.jsx", () => {
  const originalModule = jest.requireActual("../../context/RestaurantContext");

  return {
    ...originalModule,
    useRestaurants: () => ({
      restaurants: MOCK_DATA,
      loading: false,
      error: null,
    }),
  };
});

const createTestRouter = (initialEntries = ["/"]) => {
  return createMemoryRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePageContext />,
          },
          {
            path: "restaurant/:id",
            element: <RestaurantMenus />,
          },
          {
            path: "about",
            element: <div data-testid="about-page">About Page</div>,
          },
          {
            path: "contact",
            element: <div data-testid="contact-page">Contact Page</div>,
          },
        ],
      },
    ],
    {
      initialEntries,
      initialIndex: 0,
    }
  );
};

const renderWithProvidersAndRouter = (initialEntries = ["/"]) => {
  const router = createTestRouter(initialEntries);

  return render(
    <Provider store={store}>
      <RestaurantProvider>
        <RouterProvider router={router} />
      </RestaurantProvider>
    </Provider>
  );
};

// jest does not understand fetch or async/await
// because it is not a part of the js standard library and it is provided by the browser
// so we need to mock it using global.fetch
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
    ok: true,
  });
});

// it("Should render the HomePage with the Header", async () => {
//   // this is an integration test

//   // search bar is in header (sub-component) and all the restaurants are in the HomePage when search button is clicked

//   /***
//    * src
//    *  ├── __tests__
//    *  │   └── integration-testing
//    *  │       └── Search.test.js
//    *  ├── components
//    *  │   ├── header
//    *  │   │   └── Header.jsx (header uses search bar)
//    *  │   └── search-bar
//    *  │       └── SearchBar.jsx
//    *  ├── pages
//    *  │   └── home
//    *  │       └── HomePageContext.jsx (all the restaurants are here)
//    *  ├── router
//    *  │   └── appRouter.js (main layout with header and footer and home page as child or outlet)
//    *  ├── utils
//    *  │   └── resCardMock.json
//    *  └── react-redux
//    *      └── store.js
//    *  └── index.js
//    *  └── App.js
//    *  └── App.css
//    *  └── index.css
//    *  └── package.json
//    */

//   await act(async () =>
//     render(
//       <BrowserRouter>
//         <Provider store={store}>
//           <MainLayout />
//         </Provider>
//       </BrowserRouter>
//     )
//   );

//   // const searchBtn = screen.getAllByRole("button", {
//   //   name: /Search/i,
//   // });

//   const cardsBeforeSearch = screen.getAllByTestId("restaurant-card");
//   expect(cardsBeforeSearch.length).toBe(0);

//   //   const searchBtn = screen.getAllByTestId("search-button");
//   //   //   const searchInput = screen.getAllByTestId("search-input");
//   //   //   const searchInput = screen.getAllByPlaceholderText(
//   //   //     "Search restaurants, food, recipes..."
//   //   //   );

//   //   const searchInput = screen.getAllByRole("textbox", {
//   //     name: /Search/i,
//   //   });

//   //   fireEvent.change(searchInput, {
//   //     target: { value: "pizza" }, // change the input value
//   //   });

//   //   fireEvent.click(searchBtn);
// });

describe("Search Functionality Integration Test", () => {
  // beforeAll and beforeEach are called before each test

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render search bar in the header", () => {
    // renderWithProviders(<MainLayout />);
    renderWithProvidersAndRouter();
    const searchInput = screen.getAllByTestId("search-input");
    expect(searchInput[0]).toBeInTheDocument();
  });

  //   test("should filter restaurants when typing in search bar", async () => {
  //     // renderWithProviders(<MainLayout />);
  //     renderWithProvidersAndRouter();

  //     await act(async () => {
  //       const searchInput = screen.getAllByTestId("search-input");
  //       expect(searchInput[0]).toBeInTheDocument();
  //       fireEvent.change(searchInput[0], {
  //         target: { value: "pizza" },
  //       });
  //       const searchBtn = screen.getAllByTestId("search-button");
  //       fireEvent.click(searchBtn[0]);

  //       const cardsAfterSearch = await screen.findAllByTestId("restaurant-card");
  //       expect(cardsAfterSearch.length).toBe(MOCK_DATA.length);
  //     });

  //     // await waitFor(() => {
  //     //   const searchInput = screen.getAllByTestId("search-input");
  //     //   expect(searchInput[0]).toBeInTheDocument();
  //     //   fireEvent.change(searchInput[0], {
  //     //     target: { value: "pizza" },
  //     //   });
  //     // });
  //     // await waitFor(() => {
  //     //   const searchBtn = screen.getAllByTestId("search-button");
  //     //   fireEvent.click(searchBtn[0]);
  //     // });
  //   });

  //   test("should filter restaurants in HomePage outlet when typing in header's search bar", async () => {
  //     renderWithProvidersAndRouter();

  //     // Wait for initial render and all restaurants to load
  //     await waitFor(() => {
  //       expect(screen.getAllByTestId("restaurant-card").length).toBe(
  //         MOCK_DATA.length
  //       );
  //     });

  //     // Type in search bar (which is in the header in MainLayout)
  //     const searchInput = screen.getByPlaceholderText(
  //       "Search restaurants, food, recipes..."
  //     );
  //     await userEvent.type(searchInput, "Spice");

  //     // Wait for debounce and filtering
  //     await waitFor(
  //       () => {
  //         const filteredRestaurants = mockRestaurants.filter((restaurant) =>
  //           restaurant.info.name.toLowerCase().includes("spice".toLowerCase())
  //         );

  //         expect(screen.getAllByTestId("restaurant-card").length).toBe(
  //           filteredRestaurants.length
  //         );

  //         // Verify the correct restaurants are displayed in the outlet
  //         filteredRestaurants.forEach((restaurant) => {
  //           expect(screen.getByText(restaurant.info.name)).toBeInTheDocument();
  //         });
  //       },
  //       { timeout: 1000 }
  //     );
  //   });

  //   test("should show 'no results' message in HomePage outlet when search from header has no matches", async () => {
  //     renderWithProvidersAndRouter();

  //     // Wait for initial render
  //     await waitFor(() => {
  //       expect(screen.getAllByTestId("restaurant-card").length).toBe(
  //         MOCK_DATA.length
  //       );
  //     });

  //     const searchInput = screen.getByPlaceholderText(
  //       "Search restaurants, food, recipes..."
  //     );
  //     await userEvent.type(searchInput, "NonExistentRestaurant");

  //     await waitFor(
  //       () => {
  //         expect(
  //           screen.getByText(/No restaurants found matching/i)
  //         ).toBeInTheDocument();
  //       },
  //       { timeout: 1000 }
  //     );
  //   });
});
