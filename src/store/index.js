import { configureStore } from '@reduxjs/toolkit';
import listPhotosReducer from './ListPhotos/ListPhotosSlice';

export const store = configureStore({
  reducer: {
    listPhotos: listPhotosReducer,
  }
});
