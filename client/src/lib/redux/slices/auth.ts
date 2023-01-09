import { createSlice } from "@reduxjs/toolkit";

export type Auth = {
  _id: string;
  name: string;
  email: string;
  refeshToken: string | null;
};

const auth = createSlice({
  name: "auth",
  initialState: {
    auth: undefined,
  } as { auth: Auth | undefined },
  reducers: {
    setAuthSlice: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuthSlice } = auth.actions;

export default auth.reducer;
