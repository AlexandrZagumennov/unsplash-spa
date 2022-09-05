import style from './Photo.module.css';
import { Link } from 'react-router-dom';
import formatDate from '../../../../utils/formatDate';
import PropTypes from 'prop-types';
import { ReactComponent as UserIcon } from '../../img/user.svg';

export const Photo = ({ photoData }) => {
  const {
    id,
    urls,
    alt_description: alt,
    user,
    likes,
    created_at: created,
  } = photoData;

  const avatar = user.profile_image;

  return (
    <>
      <li className={style.card} id={id}>
        <Link to={`photos/${id}`}>
          {urls.small ? (
            <img className={style.cardImg} src={urls.small} alt={alt} />
          ) : (
            <img className={style.cardImg} src = '../../img/notphoto.jpg'/>
          )}
          <div className={style.cardAuthor}>
            {avatar.small ? (
              <img className={style.cardAvatar} src={avatar.small} alt = {`Аватар ${user.username}`}/>
            ) : <UserIcon/>}

            <p className={style.cardUsername}>
              {user.username ? (user.username) : 'Имя пользователя не найдено'}
            </p>
          </div>

          <button className={style.cardPhotoLike}>{likes}</button>
          <time className={style.created}>{formatDate(created)}</time>
        </Link>
      </li>
    </>
  );
};

Photo.propTypes = {
  photoData: PropTypes.object,
};
