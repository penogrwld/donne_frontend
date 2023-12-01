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
    isConnected: false,
    latitude: null,
    longitude: null,
    numberLikes: 0,
    numberWhoLiked: 0,
    numberGifts: 0
  },
};

// Ce reducer sert à récupérer les informations du user connecté. 
// Notamment le token dont on a besoin presque partout. 

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
    },
    addLike: (state, action) => {
      state.value.numberLikes += 1
    },
    removeLike: (state, action) => {
      state.value.numberLikes -= 1
    }, // Pas utile
    removeWhoLiked: (state, action) => {
      state.value.numberWhoLiked -= 1
    }, // Pas utile
    addGift: (state, action) => {
      state.value.numberGifts += 1
    },
    addLatitude: (state, action) => {
      state.value.latitude = action.payload
    },
    addLongitude: (state, action) => {
      state.value.longitude = action.payload
    },
  },
});

export const { signUp, signIn, logout, addGift, addLongitude, addLatitude, removeWhoLiked, addProfilePic, removeProfilePic, addLike, removeLike } = userSlice.actions;
export default userSlice.reducer;