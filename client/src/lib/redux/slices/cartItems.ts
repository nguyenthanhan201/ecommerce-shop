import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null as object | null
}

const cartItemsModel = createSlice({
  name: "cartItemsModel",
  initialState,
  reducers: {
    setCartItemsSlice: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setCartItemsSlice } = cartItemsModel.actions

export default cartItemsModel.reducer