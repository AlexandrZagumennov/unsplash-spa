import { useEffect, useRef } from 'react';
import style from './List.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { photosAsyncRequest } from '../../../store/photos/photosAction';
import Photo from './Photo';
import Layout from '../../Layout';
import MainLoader from '../../../ui/MainLoader';

export const List = () => {
  const token = useSelector(state => state.auth.token);
  const photos = useSelector(state => state.photos.data);
  const status = useSelector(state => state.photos.status);
  const uniqPhotos = photos.filter((element, index, array) => array.findIndex(photo => (photo.id === element.id)) === index);

  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photosAsyncRequest());
  }, [token]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(photosAsyncRequest());
      }
    }, {
      rootMargin: '100px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <Layout>
        <ul className={style.list}>
          {status === 'loading' && <MainLoader/>}
          {uniqPhotos && uniqPhotos.map(photo => (
            <Photo key = {photo.id} photoData = {photo}/>)
          )}
          <li className={style.end} ref={endList}/>
        </ul>
      </Layout>
    </>
  );
};
