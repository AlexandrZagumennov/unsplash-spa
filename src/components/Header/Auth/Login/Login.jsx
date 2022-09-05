import style from './Login.module.css';
import { ReactComponent as LoginIcon } from '../img/login.svg';
import { urlAuth } from '../../../../api/auth';

export const Login = () => (
  <a className = { style.btn } href = { urlAuth }>
    <LoginIcon/>
  </a>
);
