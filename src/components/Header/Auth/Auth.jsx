import { useEffect } from 'react';
import { Logout } from './Logout/Logout';
import { Login } from './Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../../store/auth/authSlice';
import { tokenAsyncRequest } from '../../../store/auth/authAction';


export const Auth = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const code = useSelector(state => state.auth.code);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.getToken());

    if (code) {
      dispatch(tokenAsyncRequest(code));
    }
  }, [code]);

  return (
    <div>
      {isAuth ? (<Logout/>) : (<Login/>)}
    </div>
  );
};
