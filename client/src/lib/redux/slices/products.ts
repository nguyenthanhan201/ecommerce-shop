import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  _id: string,
  title: string,
  image01: string,
  image02: string,
  price: string,
  slug: string,
  size: Array<string>,
  categorySlug: string,
  colors: Array<string>,
  description: string,
  views: number,
  deletedAt?: string,
  stock: number,
  discount?: number,
};

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
    err: null
  },
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
