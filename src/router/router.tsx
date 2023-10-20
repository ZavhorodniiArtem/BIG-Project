import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import Posts from '@/view/posts/components/Posts.tsx';
import Post from '@/view/posts/components/Post.tsx';
import Login from '@/view/auth/login/Login.tsx';
import Registration from '@/view/auth/registration/Registration.tsx';
import NotFound from '../view/notFound/NotFound.tsx';
import WithAuth from '@/view/auth/WithAuth.tsx';
import Profile from '@/view/profile/Profile.tsx';

export const enum EUrlPages {
  Home = '/',
  Posts = '/posts',
  Post = '/posts/:id',
  Profile = '/profile',
  Login = '/login',
  Registration = '/registration',
  Not_Found = '*',
}

export const router = createBrowserRouter([
  {
    path: EUrlPages.Home,
    element: <App />,
    children: [
      { path: EUrlPages.Posts, element: <Posts /> },
      { path: EUrlPages.Post, element: <Post /> },
      { path: EUrlPages.Profile, element: <Profile /> },
      {
        path: EUrlPages.Login,
        element: (
          <WithAuth>
            <Login />
          </WithAuth>
        ),
      },
      {
        path: EUrlPages.Registration,
        element: (
          <WithAuth>
            <Registration />
          </WithAuth>
        ),
      },
    ],
  },
  { path: EUrlPages.Not_Found, element: <NotFound /> },
]);
