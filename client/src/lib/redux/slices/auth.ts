import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../types/auth.type";

const initialState = {
  auth: null as Auth | null
}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSlice: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuthSlice } = auth.actions;

export default auth.reducer;
