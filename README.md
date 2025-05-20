# Hamro Bhojan (हाम्रो भोजन)

## Description

Hamro Bhojan is built using React.js, but without CRA (Create React App or any other boilerplate tool like Vite, Next.js, etc.). Instead, it uses a custom parcel configuration to bundle the application. This approach allows for greater flexibility and control over the build process, making it easier to customize the application to meet specific requirements.

## Technologies Used

- HTML
- CSS
- JavaScript
- Parcel
- React.js
- React Hooks
  - useState
  - useEffect
  - useRef
  - useContext
- React Router Dom
  - BrowserRouter & createBrowserRouter
  - Routes
  - Route
  - Link
  - for routing (dynamic routing)
  - for navigation
- lucide icons from lucide react
- swiggy api (for restaurant data)
- axios (for making API calls)
- redux-toolkit/rtk (for state management)

## Features

- Header with Logo and Navigation Links, and cart icon
- Search bar for searching restaurants, food items, and recipes with autocomplete suggestions
- home page with a list of recipes and a "Load More" button to load more recipes
- restaurant card with restaurant name, image, and description, rating and a "View Menu" button,
- Recipe details page with a "Like" button and a comment section
- footer with links to social media and other pages
- Responsive design for mobile and desktop devices

## Lower Level Design

```
- Header
  - Logo
  - Navigation Links
    - Home
    - About Us
    - Contact Us
  - Cart Icon
- Search Bar
    - Input Field
    - Autocomplete Suggestions
- Home Page
    - Restaurant Cards
        - Restaurant Name
        - Image
        - Description
        - Rating
        - View Menu Button
            - Recipe List
                - Recipe Cards
                - Image
                - Title
                - Description
                - Rating
                - View Recipe Button
                - Add to Cart Button
                - Load More Button
                    - Recipe Details Page
                        - Recipe Title
                        - Image
                        - Description
                        - Ingredients List
                        - Instructions List
                        - Like Button
                        - Comment Section
                        - Related Recipes
- Footer
    - Social Media Links
    - Other Links
```

```bash
not using keys (not acceptable) <<< index as key={index} <<< unique id as key={uniqueId} (best practice)

never keep hardcoded data in the component files, always keep it in a separate file and import it into the component file. (best practice)

- when app loads --- (fetch data) ----> api call (takes 5000ms) --- (wait for data to come) --> render data
- when app loads ----> render ui (skeleton) ----> make api call ---> rerender ui with data (better approach, better ux)
  - rendering twice: react renders cycle are very fast (better user experience) ----> better approach
  - use useEffect hook for this approach

  always call hooks inside the component and at the top level of the component (best practice)

  never call hooks inside loops, conditions, or nested functions (best practice)

  single responsibility principle (best practice)
  - each component should have a single responsibility (best practice)

- best app performance
  - chunking
  - break app into smaller pieces (smaller logical chunks or bundles of one single file)
  - code splitting
  - dynamic bundling
  - lazy loading
  - demand loading
  - dynamic import

  - import() function

- ContextAPI
  - global state management
  - createContext() function
  - useContext() hook
  - Provider and Consumer components

```

### Redux-Toolkit

- install redux-toolkit and react-redux
- redux-toolkit is a library that provides a set of tools and best practices for managing state in React applications using Redux.
- it simplifies the process of creating and managing Redux stores, reducers, and actions, making it easier to work with Redux in React applications.

```bash
npm install @reduxjs/toolkit react-redux
```

- create a store
- store is a single source of truth (global state)

- connect the store to the app
- use Provider component from react-redux to provide the store to the app
- use useSelector and useDispatch hooks from react-redux to access the store and dispatch actions
- useSelector is used to select a piece of state from the store
- useDispatch is used to dispatch actions to the store
- useSelector is used to read the state from the store
- useDispatch is used to update the state in the store

- create a slice
- slice is a piece of the store (a part of the store)
- slice is a reducer and actions
- slice is a function that takes the initial state and returns an object with the reducer and actions

```js
import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // older vanilla redux ===> don't mutate the state directly
      // const newState = [...state];
      // newState.items.push(action.payload);
      // return newState;

      // In Redux Toolkit, we can use the "immer" library to write "mutating" code
      // that is actually immutable under the hood.
      // Immer allows us to write code that looks like we're mutating the state,
      // but it actually creates a new state object.
      // This is a more concise and readable way to update the state.
      // state.items.push(action.payload); // This is allowed in Redux Toolkit

      // generate a unique ID for the cart item
      const cartItemId = `${action.payload.id}_${Date.now()}`;
      const itemWithUniqueId = {
        ...action.payload,
        cartItemId, // Add a unique cartItemId for each cart item
      };
      state.items.push(itemWithUniqueId);
    },
    removeFromCart: (state) => {
      state.items.pop();
    },
    // originalState = ["item1", "item2", "item3"]
    clearCart: (state) => {
      // console.log(state); // proxy object
      // console.log(current(state)); // current state object: originalState
      // state = [] // this will not update the state because this is the local state variable created in the function

      state.items.length = 0;
      // return { items: [] }; // This is also valid
      // return { ...state, items: [] }; // This is also valid
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

## Testing

- Jest installation

```bash
npm install --save-dev jest
```

- React Testing Library (RTL)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

- babel dependencies (@babel/preset-env, @babel/preset-react, @babel/plugin-transform-runtime) (babel.config.json)

```bash
npm install --save-dev @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
```

- babel configuration (babel.config.json)

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

- parcel configuration to disable the default babel configuration (.parcelrc)

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.{js,mjs,jsx,cjs,ts,tsx}": [
      "@parcel/transformer-js",
      "@parcel/transformer-react-refresh-wrap"
    ]
  }
}
```

- test script in package.json

```json
"scripts": {
  "test": "jest --watchAll"
}
```

- jest configuration (jest.config.js)

```bash
npx jest --init

The following questions will help Jest to create a suitable configuration for your project

√ Would you like to use Typescript for the configuration file? ... no
√ Choose the test environment that will be used for testing » jsdom (browser-like)
√ Do you want Jest to add coverage reports? ... yes
√ Which provider should be used to instrument code for coverage? » babel
√ Automatically clear mock calls, instances, contexts and results before every test? ... yes
```

- using Jest 28 or later, jest-environment-jsdom package now must be installed separately

```bash
npm install --save-dev jest-environment-jsdom
```

- jest.config.js

```js
+  testEnvironment: 'jsdom',
```
