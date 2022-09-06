import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_PHOTOS, ACCESS_KEY } from '../../api/const';
import { photoPageSlice } from './photoPageSlice';

export const photoPageAsyncRequest = createAsyncThunk(
  'photoPage/photoPageAsyncRequest',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.token;
    dispatch(photoPageSlice.actions.getPhoto());
    try {
      const response = await fetch(`${API_URL_PHOTOS}/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
        },
      });

      if (!response) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      dispatch(photoPageSlice.actions.setPhoto(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeAsyncRequest = createAsyncThunk(
  'photoPage/likeAsyncRequest',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const isLiked = getState().photoPage.photo.liked_by_user;
    const token = getState().auth.token;

    dispatch(photoPageSlice.actions.likeRequest());
    try {
      const response = await fetch(`${API_URL_PHOTOS}/${id}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      dispatch(photoPageSlice.actions.setLike(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
