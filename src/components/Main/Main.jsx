import style from './Main.module.css';
import { List } from './List/List';

export const Main = () => {
  console.log(style);
  return (
    <main className={style.main}>
      <List/>
    </main>
  );
};
