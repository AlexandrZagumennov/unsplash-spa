import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_PHOTOS, ACCESS_KEY } from '../../api/const';
import { photoPageSlice } from './photoPageSlice';

export const photoPageAsyncRequest = createAsyncThunk(
  'photoPage/photoPageAsyncRequest',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${API_URL_PHOTOS}/${id}`, {
        params: {
          client_id: ACCESS_KEY,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      photoPageSlice.actions.setPhoto(data);

      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*
    axios.get(`${API_URL}/photos/${id}`, {
      params: {
        client_id: CLIENT_ID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({data}) => {
        setPhoto(data);
        dispatch(clearPhotos());
      })
      .catch(err => {
        console.error(err);
      });
*/
