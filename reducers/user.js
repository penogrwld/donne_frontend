import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    email: null,
    password: null,
    firstname: null, 
    lastname: null,
    username: null, 
    isConnected: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
        state.value.token = action.payload.token;
        state.value.firstname = action.payload.firstname;
        state.value.lastname = action.payload.lastname;
        state.value.username = action.payload.username;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password;
        state.value.isConnected = true
      },
      signIn: (state, action) => {
        state.value.token = action.payload.token;
        state.value.username = action.payload.username;
        state.value.password = action.payload.password;
        state.value.isConnected = true
      },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.isConnected = false
    },
  },
});

export const { signUp, signIn, logout } = userSlice.actions;
export default userSlice.reducer;