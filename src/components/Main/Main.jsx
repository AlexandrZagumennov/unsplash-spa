import style from './Main.module.css';
import { List } from './List/List';
import { Routes, Route } from 'react-router-dom';
import PhotoPage from './PhotoPage';

export const Main = () => (
  <main className={style.main}>
    <Routes>
      <Route index element={<List />} />
      <Route path='photos/:id' element={<PhotoPage />} />
    </Routes>
  </main>
);
