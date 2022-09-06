import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photo: [],
  status: '',
  error: null,
};

export const photoPageSlice = createSlice({
  name: 'photoPage',
  initialState,
  reducers: {
    getPhoto: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
      state.error = '';
      state.status = 'loaded';
    },
    likeRequest: (state) => {
      state.errorLike = '';
      state.statusLike = 'loading';
    },
    setLike: (state, action) => {
      state.photo = { ...state.photo, ...action.payload.photo };
      state.errorLike = '';
      state.statusLike = 'loaded';
    },
  },
});

export default photoPageSlice.reducer;
