import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  isAuthenticated: boolean;
  userData: any;
}

const initialState: UserType = {
  isAuthenticated: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.userData = action.payload;
    },
  },
  initialState,
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
