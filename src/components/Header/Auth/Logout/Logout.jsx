import style from './Logout.module.css';
import Loader from '../../../../ui/Loader';
import { useAuth } from '../../../../hooks/useAuth';
import { ReactComponent as UserIcon } from '../img/user.svg';

export const Logout = () => {
  const [auth, loading, status, clearAuth] = useAuth();
  return (
    <div>
      {loading ? (<Loader/>) : auth.name ? (
        <div className={style.container}>
          <div className={style.row}>
            <img className={style.avatar} src={auth['profile_image'].medium} alt='Аватар' />
            <h3 className={style.user}>{auth.name}</h3>
            <button
              className={style.exit}
              onClick={() => clearAuth()}
            >
              Выйти
            </button>
          </div>
        </div>
      ) : status === 'rejected' ? (
        <span className={style.error}>Произошла ошибка</span>
      ) : (
        <UserIcon />
      )}
    </div>
  );
};
