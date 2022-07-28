import { createSlice } from "@reduxjs/toolkit";

export const CartManage = createSlice({
  name: "CartManage",
  initialState: { cartData: [] },
  reducers: {
    addToCart: (state, action) => {
      const { data } = action.payload;
      state.cartData.push(data);
    },
    removeToCart: (state, action) => {
      const index = action.payload;
      state.cartData.splice(index, 1);
      console.log(index);
    },
  },
});
export const { addToCart, removeToCart } = CartManage.actions;
export default CartManage.reducer;
