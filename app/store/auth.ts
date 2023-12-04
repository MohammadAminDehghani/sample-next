import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import User, { UserType } from "../models/user";

interface AuthState {
  loadingUser?: boolean;
  phoneVerifyToken?: string;
  user?: UserType;
}

const initialState: AuthState = {
  loadingUser: true,
  phoneVerifyToken: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePhoneVerifyToken: (state, action: PayloadAction<string | undefined>) => {
      state.phoneVerifyToken = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    updateLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.loadingUser = action.payload;
    },
  },
});

export const { updatePhoneVerifyToken, updateUser, updateLoadingUser } = authSlice.actions;

export const selectPhoneVerifyToken = (state: RootState) => state.auth.phoneVerifyToken;
export const selectUser = (state: RootState) => new User(state.auth.user);
export const selectLoadingUser = (state: RootState) => state.auth.loadingUser;

export default authSlice.reducer;
