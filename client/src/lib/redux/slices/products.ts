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
  views: number
};

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProductsSlice: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProductsSlice } = products.actions;

export default products.reducer;
