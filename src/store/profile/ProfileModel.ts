import { types } from 'mobx-state-tree';

export const ProfileModel = types.model('ProfileModel', {
  userName: types.string,
  birthday: types.string,
});
