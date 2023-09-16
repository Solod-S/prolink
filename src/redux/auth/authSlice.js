import { createSlice } from "@reduxjs/toolkit";
import * as authOperation from "../auth/authOperation";

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  isloggedIn: false,
  isRefreshing: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperation.register.fulfilled](state, action) {},
    [authOperation.passwordRestore.fulfilled](state, action) {},
    [authOperation.logIn.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.sessionId = action.payload.data.sessionId;
      state.isloggedIn = true;
    },
    [authOperation.logOut.fulfilled](state, _) {
      state.user = {};
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isloggedIn = false;
    },
    [authOperation.fetchCurrentUser.fulfilled](state, action) {
      state.user = { ...action.payload };
      state.isloggedIn = true;
    },
    [authOperation.logOut.rejected](state, _) {
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isloggedIn = false;
    },
    [authOperation.fetchCurrentUser.rejected](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isloggedIn = false;
    },
  },
});

export default AuthSlice.reducer;