import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  token: string | null;
  userData: any;
  mode: "signin" | "signup";
  hasOnBoarded: boolean;
}

const initialState: UserType = {
  token: null,
  userData: null,
  mode: "signup",
  hasOnBoarded: false,
};

const userSlice = createSlice({
  name: "user",
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setMode(state, action: PayloadAction<"signin" | "signup">) {
      state.mode = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    setHasOnboarded(state, action: PayloadAction<boolean>) {
      state.hasOnBoarded = action.payload;
    },
  },
  initialState,
});

export const { setToken, setMode, setUser, setHasOnboarded } =
  userSlice.actions;
export default userSlice.reducer;
