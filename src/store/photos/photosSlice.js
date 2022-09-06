import { createSlice } from '@reduxjs/toolkit';
import { photosAsyncRequest } from './photosAction';
import { setError } from '../../utils/setError';

const initialState = {
  data: [],
  status: null,
  error: null,
  after: '',
  isLast: false,
  countPages: 1,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotos: (state) => {
      state.data = [];
      state.countPages = 1;
    },
  },
  extraReducers: {
    [photosAsyncRequest.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [photosAsyncRequest.fulfilled.type]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload.data;
      state.countPages = action.payload.countPages;
      state.error = null;
      state.isLast = !action.payload.after;
    },
    [photosAsyncRequest.rejected.type]: setError,
  },
});

export const { clearPhotos } = photosSlice.actions;

export default photosSlice.reducer;
