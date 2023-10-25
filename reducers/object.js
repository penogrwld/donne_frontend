import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    image:[],
  }
};

export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
        state.value.image.push(action.payload)
    },
    removePhoto: (state, action) => {
        state.value.image = state.value.image.filter((data) => data !== action.payload)
      },
      removeAll: (state, action) => {
        state.value.image = []
      }
  },
});

export const { addPhoto, removePhoto, removeAll } = objectSlice.actions;
export default objectSlice.reducer;