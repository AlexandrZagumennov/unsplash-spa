import style from './PhotoPage.module.css';
import Layout from '../../Layout';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { photoPageAsyncRequest } from '../../../store/photoPage/photoPageAction';
import formatDate from '../../../utils/formatDate';
import { ReactComponent as UserIcon } from '../img/user.svg';
import MainLoader from '../../../ui/MainLoader';
import Like from './Like';

export const PhotoPage = () => {
  const photo = useSelector(state => state.photoPage.photo);
  const status = useSelector(state => state.photoPage.status);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(photoPageAsyncRequest(id));
  }, [id]);

  return (
    <Layout>
      <section className={style.photo}>
        <div className={style.photoWrapper}>
          {status === 'loading' ? <MainLoader/> : (
            !Array.isArray(photo) &&
              <>
                {photo.urls.regular ? (
                  <img className={style.photoPicture} src={photo.urls.regular} alt='Фото'/>
                ) : (
                  <img className={style.photoPicture} src='../img/notphoto.jpg' alt='Фото'/>
                )}

                <div className={style.photoControls}>
                  <a className={style.photoAuthor} href ={photo.user.links.html} target = '_blank' rel="noreferrer">
                    {photo.user.profile_image.small ? (
                      <img src={photo.user.profile_image.small} alt='Фото автора'/>
                    ) : (
                      <UserIcon/>
                    )}
                    <span>{photo.user.username ? photo.user.username : 'Имя автора не указано'}</span>
                  </a>

                  <Like className={style.photoLike} id={id} photo={photo}/>

                  <time className={style.photoDate}>
                    {photo.created_at ? (
                        formatDate(photo.created_at)
                      ) : ('Дата не указана')}
                  </time>
                  <Link className={style.comeback} to='/'>На главную</Link>
                </div>
              </>
        )}
        </div>
      </section>
    </Layout>
  );
};
