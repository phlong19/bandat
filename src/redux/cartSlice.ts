import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../model";

const initialState: { count: number; products: Product[] } = {
  count: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.count += 1;

      const check = state.products.find((i) => i.id === action.payload.id)?.id;

      state.products = check
        ? state.products.map((p) =>
            p.id === action.payload.id
              ? { ...p, quantity: p.quantity! + 1 }
              : p,
          )
        : [...state.products, { ...action.payload, quantity: 1 }];

      updateLocalStorage(state);
    },
    getItemFromStorage: (state) => {
      state.count = Number(localStorage.getItem("count")) || 0;
      state.products = JSON.parse(localStorage.getItem("products") || "[]");
    },

    increase: (state, action: PayloadAction<Pick<Product, "id">>) => {
      state.count++;
      state.products = state.products.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity! + 1 } : i,
      );

      updateLocalStorage(state);
    },

    decrease: (state, action: PayloadAction<Pick<Product, "id">>) => {
      const isLast =
        state.products.find((i) => i.id === action.payload.id)?.quantity === 1;

      state.count -= 1;

      state.products = isLast
        ? state.products.filter((i) => i.id !== action.payload.id)
        : state.products.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity! - 1 }
              : i,
          );

      updateLocalStorage(state);
    },

    remove: (state, action: PayloadAction<Pick<Product, "id">>) => {
      const currentQuantity =
        state.products.find((i) => i.id === action.payload.id)?.quantity || 0;

      state.count -= currentQuantity;
      state.products = state.products.filter((p) => p.id !== action.payload.id);

      updateLocalStorage(state);
    },

    inputQuantity: (state, action: PayloadAction<Product>) => {
      const currentQuantity =
        state.products.find((i) => i.id === action.payload.id)?.quantity || 0;
      state.count = state.count - currentQuantity + action.payload.quantity!;

      state.products = state.products.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity! }
          : i,
      );

      updateLocalStorage(state);
    },

    order: (state) => {
      state.count = 0;
      state.products = [];

      localStorage.clear();
    },
  },
});

export const {
  addItem,
  getItemFromStorage,
  order,
  increase,
  decrease,
  remove,
  inputQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

function updateLocalStorage(state: any) {
  localStorage.setItem("products", JSON.stringify(state.products));
  localStorage.setItem("count", state.count);
}
