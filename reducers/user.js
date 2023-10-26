import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    photo: null,
    token: null, 
    avatar: null,
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
        state.value.avatar = action.payload.avatar;
        state.value.firstname = action.payload.firstname;
        state.value.lastname = action.payload.lastname;
        state.value.username = action.payload.username;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password;
        state.value.isConnected = true
      },
      signIn: (state, action) => {
        state.value.token = action.payload.token;
        state.value.avatar = action.payload.avatar;
        state.value.username = action.payload.username;
        state.value.firstname = action.payload.firstname;
        state.value.lastname = action.payload.lastname;
        state.value.email = action.payload.email;
        state.value.password = action.payload.password;
        state.value.isConnected = true
      },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.isConnected = false
    },
    addProfilePic: (state, action) => {
      state.value.avatar = action.payload
    },
    removeProfilePic: (state, action) => {
      state.value.avatar = null
    }
  },
});

export const { signUp, signIn, logout, addProfilePic, removeProfilePic } = userSlice.actions;
export default userSlice.reducer;