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

  Reacts class based rendering cycle is not equivalent to functional component rendering cycle with hooks.

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

- jest-dom is a set of custom matchers for Jest that can be used to extend Jest's built-in assertions

```bash
npm install --save-dev @testing-library/jest-dom
```

```bash
- "describe" is used to group related tests together
- we can use "it" or "test" to define a test case ("test" is an alias for "it")
- "it" is a function that takes a string (the name of the test) and a function (the test itself)
- "expect" is a function that takes a value and returns an object with matchers (like toBe, toEqual, etc.) allowing us to make assertions about the value
```

## Testing time errors

### rendering errors: component not rendering render(<Component />)

- Solution:

  - @babel/preset-react is not installed to transform the JSX code into JavaScript code
  - @babel/plugin-transform-runtime is not installed to transform the async/await code into JavaScript code

  ### import errors: import { render } from "@testing-library/react" (importing react-testing-library)

  - Solution:
    - @testing-library/react is not installed
    - @testing-library/jest-dom is not installed, not imported in the test file
    - jest-environment-jsdom is not installed, not configured in the jest.config.js file
    - @testing-library/jest-dom providers custom matchers for Jest like toBeInTheDocument, toHaveTextContent, toHaveClass, etc.

### react-redux (rtk errors): useSelector, useDispatch, Provider

- Solution:
  - react-redux is not installed
  - redux-toolkit is not installed
  - Provider component is not imported in the test file
  - useSelector and useDispatch hooks are not imported in the test file
  - jest.mock() is not used to mock the redux store in the test file

### css errors: css is not working

- Solution:
  - identity-obj-proxy is not installed to mock the CSS modules (to prevent CSS modules from being transformed into JavaScript objects)
  - jest.config.js file is not configured properly
  - parcelrc file is not configured properly

```js
 moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
```

### TypeError: Cannot destructure property 'basename' of 'React\_\_namespace.useContext(...)' as it is null.

- Solution:
  - BrowserRouter is not imported or not used to wrap the component in the test file
  - createBrowserRouter is not imported or not used to wrap the component in the test file

### async/await errors: async/await is not working in the test file

- Solution:
  - @babel/plugin-transform-runtime is not installed to transform the async/await code into JavaScript code
  - @babel/preset-env is not installed to transform the async/await code into JavaScript code
  - babel.config.json file is not configured properly
  - jest.config.js file is not configured properly
  - parcelrc file is not configured properly

### coverage errors: coverage is not working

- Solution:
  - babel-plugin-istanbul is not installed to instrument the code for coverage
  - babel.config.json file is not configured properly
  - jest.config.js file is not configured properly
  - parcelrc file is not configured properly

### fetch/axios errors: fetch/axios is not working in the test file

    - Solution:

- jest.mock() is not used to mock the fetch/axios in the test file
- jest-fetch-mock is not installed to mock the fetch in the test file

```js
// jest does not understand fetch or async/await
// because it is not a part of the js standard library and it is provided by the browser
// so we need to mock it using global.fetch
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
  });
});
```

### to make the test file run in watch mode or interactive mode

in script tag in package.json

```json
"scripts": {
  "watch-test": "jest --watchAll"
}
```

```bash
npm test -- --watch
```

- or

```bash
npm test -- --watchAll
```

### to make the test file run in coverage mode

```bash
npm test -- --coverage
```

## Class Based Components

- Class based components are the older way of writing React components.

- Process of creating a class based component:
  - Create a class that extends React.Component
  - Implement a render() method that returns the JSX to be rendered
  - Use the component's state and lifecycle methods to manage the component's behavior
- Class based components are less commonly used in modern React development, as functional components with hooks provide a more concise and easier way to manage state and lifecycle methods.

- Lifecycle methods in class based components:
  - `When a component is rendered, first the constructor is called, then the render method is called, and finally the componentDidMount method is called`.
  - componentDidMount: called after the component is mounted
  - componentDidUpdate: called after the component is updated
  - componentWillUnmount: called before the component is unmounted
  - shouldComponentUpdate: called before the component is updated, used to optimize performance
  - getDerivedStateFromProps: called before the render method, used to update state based on props
- setState: used to update the component's state
- this.state: used to access the component's state
- this.props: used to access the component's props
- this.setState: used to update the component's state
- this.forceUpdate: used to force the component to re-render
- this.context: used to access the component's context
- this.refs: used to access the component's refs
- this.props.children: used to access the component's children
- this.state is an object that contains the component's state

- `if parent component is class-based, then first the parent component's constructor is called, then the parent's render method is called, then the parent's componentDidMount method is called, then the child component's constructor is called, then the child's render method is called, and finally the child's componentDidMount method is called.`

```
ComponentWillUnmount: called before the component is unmounted or if we navigate to another page or leave the component
```
