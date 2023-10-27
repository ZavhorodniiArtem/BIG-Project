import logo from '@assets/img/logo.png';
import {
  CommentOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '@hooks/useStore.ts';

const Navigation = () => {
  const { auth } = useStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.logOut().then(() => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  };

  return (
    <div className="bg-[#21201E] w-[224px] pl-10 py-10 flex flex-col justify-between h-screen fixed left-0 top-0">
      <div>
        <div className="flex items-center">
          <img src={logo} alt="logo" />
          <h1 className="text-white text-[24px] ml-1">BIG</h1>
        </div>

        <div className="mt-16">
          <div className="flex items-center">
            <HomeOutlined className="text-white" />
            <Link to="/" className="text-white text-[16px] ml-3">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center mt-9">
            <CommentOutlined className="text-white" />
            <Link to="/posts" className="text-white text-[16px] ml-3">
              Posts
            </Link>
          </div>

          <div className="flex items-center mt-9">
            <UserOutlined className="text-white" />
            <Link to="/profile" className="text-white text-[16px] ml-3">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="flex">
        <LogoutOutlined className="text-white mr-3" />
        <p className="text-white cursor-pointer" onClick={() => handleLogOut()}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Navigation;
