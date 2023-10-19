import Navigation from './view/layout/navigation/Navigation.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './view/layout/header/Header.tsx';
import { EUrlPages } from './router/router.tsx';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="flex">
        {![EUrlPages.Login, EUrlPages.Registration].includes(
          location.pathname as EUrlPages,
        ) && <Navigation />}
        <div className="p-8 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
