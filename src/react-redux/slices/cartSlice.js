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
