import style from './List.module.css';
import { useDispatch } from 'react-redux';
import { listPhotosAsyncRequest } from '../../../store/ListPhotos/ListPhotosReducer';

export const List = () => {
  console.log(style);
  const dispatch = useDispatch();
  dispatch(listPhotosAsyncRequest());
  return (
    <div className={style.list}>List</div>
  );
};
