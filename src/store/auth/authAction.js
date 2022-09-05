import {
  API_URL,
  API_URL_TOKEN,
  ACCESS_KEY,
  SECRET_KEY,
  REDIRECT_URI,
  GRANT_TYPE
} from '../../api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Запрос токена для авторизации
export const tokenAsyncRequest = createAsyncThunk(
  'auth/tokenAsyncRequest',
  async (code, { rejectWithValue }) => {
    const url = new URL(API_URL_TOKEN);
    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('client_secret', SECRET_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', GRANT_TYPE);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      return data.access_token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Запрос данных о пользователе на основании полученного токена
export const authAsyncRequest = createAsyncThunk(
  'auth/authAsyncRequest',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
