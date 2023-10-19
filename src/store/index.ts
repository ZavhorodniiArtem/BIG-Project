import { types } from 'mobx-state-tree';
import PostsStore from '@/store/posts/PostsStore.ts';
import AuthStore from './auth/authStore.ts';

const RootStore = types.model('RootStore', {
  Posts: PostsStore,
  auth: AuthStore,
});

export default RootStore;
