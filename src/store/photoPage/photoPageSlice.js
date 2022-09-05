import { createSlice } from '@reduxjs/toolkit';
import { setError } from '../../utils/setError';
import { photoPageAsyncRequest } from './photoPageAction';

const initialState = {
  photo: [],
  status: '',
  error: null,
};

export const photoPageSlice = createSlice({
  name: 'photoPage',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
      state.status = 'loaded';
      state.error = null;
    },
  },
  extraReducers: {
    [photoPageAsyncRequest.pending.type]: (state) => {
      state.photo = [];
      state.status = 'loading';
      state.error = null;
    },
    [photoPageAsyncRequest.fulfilled.type]: (state, action) => {
      state.photo = action.payload;
      state.status = 'loading';
      state.error = null;
    },
    [photoPageAsyncRequest.rejected.type]: setError,
  },
});

export default photoPageSlice.reducer;
