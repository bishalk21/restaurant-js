import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
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
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
