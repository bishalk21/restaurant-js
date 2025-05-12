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

```
