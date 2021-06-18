import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// それぞれ slice.reducer を default export している前提
import userReducer from "./user";
import itemReducer from "./item";

const reducer = combineReducers({
  user: userReducer,
  item: itemReducer,
});

const store = configureStore({ reducer });

export default store;