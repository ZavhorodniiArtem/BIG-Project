import React from 'react';

export type Author = {
  _id: string;
  userName: string;
};

export type TPost = {
  _id: string;
  title: string;
  description: string;
  tags: any[];
  viewsCount: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPostItemProps = {
  post: Pick<TPost, 'title' | 'tags' | 'description' | 'author' | '_id'>;
  deletePost: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
};

export type TCreatePostModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (modal: boolean) => void;
  createPost: (
    values: Pick<TPost, 'title' | 'description' | 'tags'>,
  ) => Promise<void>;
  getPosts: () => Promise<void>;
};

export type TUpdatePostModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  editPost: (
    values: Pick<TPost, 'title' | 'description' | 'tags'>,
    id: string,
  ) => Promise<void>;
  getPost: (id: string) => Promise<void>;
  _id: string;
  id: string | undefined;
  post: Pick<TPost, 'title' | 'description' | 'tags'>;
};
