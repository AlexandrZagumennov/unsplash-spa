import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_PHOTOS, ACCESS_KEY } from '../../api/const';

export const photosAsyncRequest = createAsyncThunk(
  'photos/fetchphotos',
  async (_, { getState, rejectWithValue }) => {
    let countPages = getState().photos.countPages;
    const prevPhotos = getState().photos.data;

    try {
      const response = await fetch(`${API_URL_PHOTOS}?${countPages > 1 ? `page=${countPages}` : ``}`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const newPhotos = await response.json();

      const data = [...prevPhotos, ...newPhotos];
      countPages++;

      return { data, countPages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
