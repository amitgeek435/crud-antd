import { createSlice } from "@reduxjs/toolkit";

export const getProducts = createSlice({
  name: "products",
  initialState: {
    allProductsData: [],
    allCategoryData: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      const { data } = action.payload;
      return { ...state, allProductsData: data };
    },
    getAllCategories: (state, action) => {
      const { data } = action.payload;
      return { ...state, allCategoryData: data };
    },
  },
});
export const { getAllProducts, getAllCategories } = getProducts.actions;
export default getProducts.reducer;
