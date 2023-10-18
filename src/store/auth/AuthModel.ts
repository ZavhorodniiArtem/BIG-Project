import { types } from 'mobx-state-tree';

export const AuthModel = types.model('Auth', {
  createdAt: types.string,
  email: types.string,
  token: types.string,
  refreshToken: types.string,
  updatedAt: types.string,
  userName: types.string,
  birthday: types.string,
  subscription: types.string,
  _id: types.string,
});

export const MeModel = types.model('Me', {
  birthday: types.maybeNull(types.string),
  createdAt: types.string,
  email: types.string,
  updatedAt: types.string,
  userName: types.maybeNull(types.string),
  subscription: types.maybeNull(types.string),
  _id: types.string,
});
