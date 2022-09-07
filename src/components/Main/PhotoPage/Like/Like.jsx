import style from './Like.module.css';
import { ReactComponent as HeartIcon } from '../../img/heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { likeAsyncRequest } from '../../../../store/photoPage/photoPageAction';
// import { photosAsyncRequest } from '../../../../store/photos/photosAction';
import { clearPhotos } from '../../../../store/photos/photosSlice';

export const Like = () => {
  const photo = useSelector(state => state.photoPage.photo);
  const token = useSelector(state => state.auth.token);
  const { id } = useParams();
  const dispatch = useDispatch();

  return (
    <button
      className={token ? style.photoLike : style.photoLikeDisabled}
      onClick={token ? (
        () => {
          dispatch(clearPhotos());
          dispatch(likeAsyncRequest(id));
        }) : () => alert('Авторизуйтесь, чтобы поставить лайк.')
      }
    >
      <span className={style.photoLikeSpan}>{photo.likes}</span>
      <HeartIcon
        className = {token ? photo['liked_by_user'] ?
          style.heartIconIsLiked : style.heartIcon : style.heartIconDisabled}/>
    </button>
  );
};
