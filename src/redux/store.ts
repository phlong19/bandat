import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  preloadedState: {
    cart: loadInitialState(),
  },
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

function loadInitialState() {
  return {
    count: Number(localStorage.getItem("count")) || 0,
    products: JSON.parse(localStorage.getItem("products") || "[]"),
  };
}

export default store;
