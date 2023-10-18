import { cast, flow, types } from 'mobx-state-tree';
import { MyPostsModel } from '@/store/my-posts/MyPostsModel.ts';
import httpClient from '@/api/requests';

const MyPostsStore = types
  .model('MyPostsStore', {
    posts: types.array(MyPostsModel),
    post: MyPostsModel,
  })

  .actions((self) => {
    return {
      getPosts: flow(function* () {
        try {
          const data = yield httpClient.get('/posts');
          self.posts = data.data;
        } catch (e) {
          console.log('error:', e);
        }
      }),
      getPost: flow(function* (id: string) {
        try {
          const data = yield httpClient.get(`/posts/${id}`);
          self.post = cast(data.data);
        } catch (e) {
          console.log('error:', e);
        }
      }),
      createPost: flow(function* (body) {
        try {
          const res = yield httpClient.post('/posts', body);
          self.posts.push(res.data);
          return res;
        } catch (e) {
          console.log('error:', e);
        }
      }),
      deletePost: flow(function* (id: string) {
        try {
          yield httpClient.delete(`/posts/${id}`);
        } catch (e) {
          console.log('error:', e);
        }
      }),
    };
  });

export default MyPostsStore;
