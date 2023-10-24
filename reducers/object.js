import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    image:[],
    title: null,
    description: null,
    localisation: {city: null, postalCode: null},
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
    addLocation: (state, action) => {
        state.value.localisation = {city: action.payload.city, 
                                    postalCode: action.payload.postalCode}
    },
    addGift: (state, action) => {
        state.value.title = action.payload.title
        state.value.description = action.payload.description
        state.value.condition = action.payload.condition
        state.value.user = action.payload.user
    }
  },
});

export const { addPhoto, addGift, addLocation } = objectSlice.actions;
export default objectSlice.reducer;