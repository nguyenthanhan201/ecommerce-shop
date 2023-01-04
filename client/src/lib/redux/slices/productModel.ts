import { createSlice } from "@reduxjs/toolkit";

const productModel = createSlice({
  name: "productModel",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: (state) => {
      state.value = null;
    },
  },
});

export const { set, remove } = productModel.actions;

export default productModel.reducer;
