import { cast, flow, types } from 'mobx-state-tree';
import { AuthModel, MeModel } from '@/store/auth/AuthModel.ts';
import { defaultAuthLogin } from '@/main.tsx';
import httpClient from '@/api/requests';

const AuthStore = types
  .model('AuthStore', {
    login: AuthModel,
    me: MeModel,
    error: types.string,
  })
  .actions((self) => {
    return {
      register: flow(function* (body) {
        try {
          const data = yield httpClient.post('/auth/registration', body);
          return data.data;
        } catch (e) {
          self.error = 'Something wrong!';
          console.log('error:', e);
        }
      }),
      logIn: flow(function* (body) {
        try {
          const data = yield httpClient.post('/auth/login', body);

          //self.login = data.data;
          return data.data;
        } catch (e) {
          self.error = 'Something wrong!';
          console.log('error:', e);
        }
      }),
      logOut: flow(function* () {
        try {
          self.login = cast(defaultAuthLogin);
        } catch (e) {
          console.log('error:', e);
        }
      }),
      getMe: flow(function* () {
        try {
          const data = yield httpClient.get('/me');
          self.me = data.data;
        } catch (e) {
          self.error = 'Something wrong!';
          console.log('error:', e);
        }
      }),
    };
  });

export default AuthStore;
