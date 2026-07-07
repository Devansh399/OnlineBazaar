import { createSlice } from "@reduxjs/toolkit";

const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? `cartItems_${user._id}` : "cartItems_guest";
};

const initialState = {
  cartItems: JSON.parse(localStorage.getItem(getCartKey())) || [],
};

// const initialState = {
//  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],  //  agr localStorage me cartItems h to usko parse krke initialState me dal do, agr nhi h to empty array dal do
// }

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    loadCart: (state) => {
      state.cartItems = JSON.parse(localStorage.getItem(getCartKey())) || [];
    },

    addToCart: (state, action) => {
      //     console.log("Payload:", action.payload);
      // console.log("Before:", state.cartItems);

      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //   console.log("After:", state.cartItems);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
      // localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      // localStorage.removeItem('cartItems');
      localStorage.removeItem(getCartKey());
    },
  },
});

export const {loadCart, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
