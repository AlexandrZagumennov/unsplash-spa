import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authAsyncRequest } from '../store/auth/authAction';
import { authSlice } from '../store/auth/authSlice';

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data);
  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAsyncRequest());
  }, [token]);

  const clearAuth = () => dispatch(authSlice.actions.logout());

  return [auth, loading, status, clearAuth];
};
