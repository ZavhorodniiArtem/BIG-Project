import { types } from 'mobx-state-tree';
import MyPostsStore from './my-posts/myPostsStore.ts';
import AuthStore from './auth/authStore.ts';

const RootStore = types.model('RootStore', {
  myPosts: MyPostsStore,
  auth: AuthStore,
});

export default RootStore;
