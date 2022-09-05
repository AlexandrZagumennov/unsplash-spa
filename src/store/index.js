import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import photosReducer from './photos/photosSlice';
// import photoPageReducer from './photoPage/photoPageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photos: photosReducer,
    // photoPage: photoPageReducer,
  },
});
