// import { applyMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import user from "./reducer/SetUserSlice";
import CartManage from "./reducer/CartSlice";
import fetchProducts from "./reducer/FethchProductsSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const RootReducer = combineReducers({
  user,
  getProducts: fetchProducts,
  CartManage: CartManage,
});

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
