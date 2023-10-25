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

  },
});

export const { addPhoto } = objectSlice.actions;
export default objectSlice.reducer;