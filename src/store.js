// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducer/setUserSlice";

const RootReducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer: RootReducer,
});

export default store;
