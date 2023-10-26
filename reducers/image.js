import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    object:[],
    user: null
  }
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
        state.value.object.push(action.payload)
    },
    removePhoto: (state, action) => {
        state.value.object = state.value.object.filter((data) => data !== action.payload)
      },
      removeAll: (state, action) => {
        state.value.object = []
      },
      removeProfilePic: (state, action) => {
        state.value.user = null
      }
  },
});

export const { addPhoto, removePhoto, removeAll } = imageSlice.actions;
export default imageSlice.reducer;