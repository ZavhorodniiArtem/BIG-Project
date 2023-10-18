import { types } from 'mobx-state-tree';

export const AuthorModel = types.model('Author', {
  userName: types.string,
  _id: types.string,
});

export const MyPostsModel = types.model('MyPostsModel', {
  _id: types.string,
  title: types.string,
  viewsCount: types.number,
  createdAt: types.string,
  description: types.string,
  author: AuthorModel,
  tags: types.array(types.string),
});
