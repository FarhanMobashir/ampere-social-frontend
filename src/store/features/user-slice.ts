import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  token: string | null;
  userData: any;
}

const initialState: UserType = {
  token: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
  initialState,
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
