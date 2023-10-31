import { flow, types } from 'mobx-state-tree';
import httpClient from '@/api/requests';
import { ProfileModel } from '@/store/profile/ProfileModel.ts';

const ProfileStore = types
  .model('ProfileStore', {
    profile: ProfileModel,
  })

  .actions((self) => {
    return {
      editProfile: flow(function* (body) {
        try {
          const res = yield httpClient.patch(`/me`, body);
          console.log('res', res);
          self.profile = res;
        } catch (e) {
          console.log('error:', e);
        }
      }),
    };
  });

export default ProfileStore;
