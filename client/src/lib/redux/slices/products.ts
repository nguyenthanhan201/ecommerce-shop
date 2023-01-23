import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/product.type";

const initialState = {
  products: [] as Array<Product>,
  err: null,
}

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsSlice: (state, action) => {
      state.products = action.payload;
    },
    setErrProductSlice: (state, action) => {
      state.err = action.payload;
    }
  },
});

export const { setProductsSlice, setErrProductSlice } = products.actions;

export default products.reducer;
