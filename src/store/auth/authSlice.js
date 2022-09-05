import { createSlice } from '@reduxjs/toolkit';
import { tokenAsyncRequest } from './authAction';
import { authAsyncRequest } from './authAction';
import { setError } from '../../utils/setError';

const initialState = {
  code: '',
  token: '',
  isAuth: false,
  loading: false,
  data: {},
  status: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken(state) {
      if (localStorage.getItem('Bearer')) {
        state.isAuth = true;
        state.token = localStorage.getItem('Bearer');
      }

      if (!localStorage.getItem('Bearer')) {
        state.isAuth = false;
        state.token = '';
      }

      if (location.search.includes('code')) {
        state.code = new URLSearchParams(location.search).get('code');
      }
    },
    logout(state) {
      state.token = '';
      state.isAuth = false;
      state.loading = false;
      state.data = {};
      state.status = null;
      state.error = null;

      localStorage.removeItem('Bearer');
    }
  },
  extraReducers: {
    // Запрос токена
    [tokenAsyncRequest.pending.type]: (state) => {
      state.token = '';
      state.isAuth = false;
      state.error = null;
    },
    [tokenAsyncRequest.fulfilled.type]: (state, action) => {
      state.code = '';
      state.token = action.payload;
      state.isAuth = true;
      state.error = null;

      localStorage.setItem('Bearer', action.payload);

      const url = new URL(location);
      url.searchParams.delete('code');
      history.pushState(null, document.title, url);
    },
    [tokenAsyncRequest.rejected.type]: setError,
    // Запрос авторизации
    [authAsyncRequest.pending.type]: (state, action) => {
      state.loading = true;
    },
    [authAsyncRequest.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.status = 'logined';
    },
    [authAsyncRequest.rejected]: setError,
  }
});

export default authSlice.reducer;
