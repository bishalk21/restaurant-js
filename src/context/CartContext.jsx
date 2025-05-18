import { createContext } from "react";

// solution to the props drilling problem
// problem: when we want to pass data from one component to another component
// without passing it through the intermediate components
// solution: use context API

// context API is a way to create global variables that can be passed around
// in a React app. It is designed to share data that can be considered “global”
// for a tree of React components, such as the current authenticated user,
// theme, or preferred language.

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default CartContext;
