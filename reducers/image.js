import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    object:[],
  }
};

// Ce reducer permet de récupérer les photos qui ont été prise dans SnapScreen et UserSnapScreen
// pour les utiliser dans DonationScreen (photos des dons) & UserScreen (photo de profil)

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
  },
});

export const { addPhoto, removePhoto, removeAll } = imageSlice.actions;
export default imageSlice.reducer;
