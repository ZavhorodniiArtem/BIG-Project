import { flow, types } from 'mobx-state-tree';
import { PostsModel } from '@/store/posts/PostsModel.ts';
import httpClient from '@/api/requests';

const PostsStore = types
  .model('PostsStore', {
    posts: types.array(PostsModel),
    post: PostsModel,
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
          const res = yield httpClient.get(`/posts/${id}`);
          self.post = res.data;
        } catch (e) {
          console.log('error:', e);
        }
      }),
      createPost: flow(function* (body) {
        try {
          const res = yield httpClient.post('/posts', body);
          self.posts.push(res.data);
        } catch (e) {
          console.log('error:', e);
        }
      }),
      editPost: flow(function* (body, id) {
        try {
          yield httpClient.patch(`/posts/${id}`, body);
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

export default PostsStore;
