import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    image:[],
    title: null,
    description: null,
    localisation: null,
    condition: null,
    user: null,
    isLiked: false,
    caughtBy: null
  }
};

export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
        state.value.image.push(action.payload)
    },
    addGift: (state, action) => {
        state.value.title = action.payload.title
        state.value.description = action.payload.description
        state.value.localisation = action.payload.localisation
        state.value.condition = action.payload.condition
        state.value.user = action.payload.user
    }
  },
});

export const { addPhoto, addGift } = objectSlice.actions;
export default objectSlice.reducer;