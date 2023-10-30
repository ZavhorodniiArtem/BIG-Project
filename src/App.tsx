import Navigation from './view/layout/navigation/Navigation.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import { EUrlPages } from './router/router.tsx';

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex">
        {![EUrlPages.Login, EUrlPages.Registration].includes(
          location.pathname as EUrlPages,
        ) && <Navigation />}
        <div className="flex-1 ml-60 mr-6 my-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
