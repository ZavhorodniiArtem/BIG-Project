import { types } from 'mobx-state-tree';
import AuthStore from './auth/authStore.ts';
import PostsStore from './posts/PostsStore.ts';
import ProfileStore from './profile/ProfileStore.ts';

const RootStore = types.model('RootStore', {
  Posts: PostsStore,
  auth: AuthStore,
  profile: ProfileStore,
});

export default RootStore;
