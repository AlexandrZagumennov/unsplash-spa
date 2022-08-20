import { createSlice } from '@reduxjs/toolkit';
import { listPhotosAsyncRequest } from './ListPhotosReducer';

const initialState = {
  loading: 'idle',
  error: null,
};

export const listPhotosSlice = createSlice({
  name: 'listPhotos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(listPhotosAsyncRequest.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(listPhotosAsyncRequest.fulfilled, (state, action) => {
        // Добавляем пользователя
        // usersAdapter.addOne(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(listPhotosAsyncRequest.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export default listPhotosSlice.reducer;
