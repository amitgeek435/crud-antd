import { createSlice } from "@reduxjs/toolkit";

export const getProducts = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getAllProducts: (state, action) => {
      const { data } = action.payload;
      return { ...state, data };
    },
  },
});
export const { getAllProducts } = getProducts.actions;
export default getProducts.reducer;
