import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/globalStyles.css';
import RootStore from './store';
import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

export const defaultAuthLogin = {
  createdAt: '',
  email: '',
  token: '',
  refreshToken: '',
  updatedAt: '',
  userName: '',
  birthday: '',
  subscription: '',
  __v: 0,
  _id: '',
};

export const defaultAuthMe = {
  createdAt: '',
  email: '',
  updatedAt: '',
  _id: '',
  userName: '',
  birthday: '',
  subscription: '',
};

export const defaultAuthor = {
  _id: '',
  userName: '',
};

const store = RootStore.create({
  auth: {
    login: defaultAuthLogin,
    me: defaultAuthMe,
    error: '',
  },
  Posts: {
    posts: [],
    post: {
      _id: '',
      author: defaultAuthor,
      tags: [],
      title: '',
      description: '',
      createdAt: '',
      viewsCount: 0,
    },
  },
});

export const StoreContext = createContext(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
