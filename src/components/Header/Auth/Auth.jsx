import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/login.svg';
import { urlAuth } from '../../../api/auth';

export const Auth = () => {
  console.log(style);
  return (
    <a className = { style.btn } href = { urlAuth }>
      <AuthIcon/>
    </a>
  );
};
