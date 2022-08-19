import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Heading from './Heading';
import Auth from './Auth';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.headerContainer}>
        <Logo/>
        <Heading/>
        <Auth/>
      </div>
    </Layout>
  </header>
);
