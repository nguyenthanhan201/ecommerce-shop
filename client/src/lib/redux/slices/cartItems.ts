import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "./auth";
import { Product } from "./products";

export type CartItems = {
  idAuth: Auth;
  idproduct: Product;
  size: string;
  color: string;
  quantity: number;
}

const cartItemsModel = createSlice({
  name: "cartItemsModel",
  initialState: {
    value: null,
  } as { value: object | null },
  reducers: {
    setCartItemsSlice: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setCartItemsSlice } = cartItemsModel.actions

export default cartItemsModel.reducer