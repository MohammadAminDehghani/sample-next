import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import User, { UserType } from "../models/user";
import { createSelector } from 'reselect';

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

const getUser = (state: RootState) => state.auth.user;
export const selectUser = createSelector(
  getUser,
  (user) => new User(user)
);

export const selectPhoneVerifyToken = (state: RootState) => state.auth.phoneVerifyToken;
export const selectLoadingUser = (state: RootState) => state.auth.loadingUser;

export default authSlice.reducer;