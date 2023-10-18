import { Link, useNavigate } from 'react-router-dom';
import logo from '@assets/img/BIG-logo.png';
import { EUrlPages } from '@/router/router.tsx';
import useStore from '@hooks/useStore.ts';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const Header = () => {
  const { auth } = useStore();
  const navigate = useNavigate();

  console.log('auth', toJS(auth.me));

  const handleLogOut = () => {
    auth.logOut().then(() => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  };

  useEffect(() => {
    auth.getMe();
  }, []);

  return (
    <div className="bg-[#333437] py-4 px-8 flex justify-between">
      <Link to="/" className="text-white text-xl flex">
        <img src={logo} alt="" className="w-4 mr-2" />
        <p className="font-bold">BIG</p>
      </Link>

      {[EUrlPages.Login, EUrlPages.Registration].includes(
        location.pathname as EUrlPages,
      ) ? (
        <div className="flex">
          <Link to="/login" className="text-white hover:underline">
            Sign in
          </Link>
          <span className="text-white mx-2">|</span>
          <Link to="/registration" className="text-white hover:underline">
            Sign up
          </Link>
        </div>
      ) : (
        <p
          onClick={() => handleLogOut()}
          className="text-white hover:underline"
        >
          Log out
        </p>
      )}
    </div>
  );
};

export default observer(Header);
