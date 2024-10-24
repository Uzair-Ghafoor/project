import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
    signOutFailure: (state) => {
      state.error = false;
      state.loading = false;
    },
    handleDeleteUser: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});
export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOutUserSuccess,
  handleDeleteUser,
  signOutFailure,
  signOutStart,
} = userSlice.actions;

export default userSlice.reducer;
