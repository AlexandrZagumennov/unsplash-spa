import style from './PhotoPage.module.css';
import Layout from '../../Layout';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { photoPageAsyncRequest } from '../../../store/photoPage/photoPageAction';
import { API_URL, ACCESS_KEY } from '../../../api/const';
import { clearPhotos } from '../../../store/photos/photosSlice';
import formatDate from '../../../utils/formatDate';
import { ReactComponent as UserIcon } from '../img/user.svg';
import axios from 'axios';

export const PhotoPage = () => {
  const [photo, setPhoto] = useState(null);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/photos/${id}`, {
      params: {
        client_id: ACCESS_KEY,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setPhoto(data);
        dispatch(clearPhotos());
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <Layout>
      <section className={style.photo}>
        <div className={style.photoWrapper}>
          {photo && (
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
                  <span>{photo.user.username ? photo.user.username : 'Имя автора не получено'}</span>
                </a>
                <button className={style.photoLike}>{photo.likes}</button>
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
