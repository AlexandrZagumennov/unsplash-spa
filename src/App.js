import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <>
    <Routes>
      <Route
        path='*'
        element = {
          <>
            <Header />
            <Main />
          </>
        }
      />
    </Routes>
  </>
);

export default App;
