import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_PHOTOS, ACCESS_KEY } from '../../api/const';
import axios from 'axios';

// URL для запоса
const url = new URL(API_URL_PHOTOS);
url.searchParams.set('client_id', ACCESS_KEY);

// Создаем Thunk
export const listPhotosAsyncRequest = createAsyncThunk(
  'photos/fetchphotos',
  async () => {
    const response = await axios.get(url);
    console.log(response.data);
    // return response.data;
  }
);
