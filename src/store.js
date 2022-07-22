import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import user from "./reducer/SetUserSlice";
import fetchProducts from "./reducer/FethchProductsSlice";

const RootReducer = combineReducers({
  user,
  getProducts: fetchProducts,
});

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
