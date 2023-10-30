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
  post: Omit<TPost, '__v' | 'updatedAt'>;
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

export type TConfirmDelete = {
  isConfirmOpen: boolean;
  setIsConfirmOpen: (bool: boolean) => void;
  deletePost: (id: string) => Promise<void>;
  getPosts: () => Promise<void>;
  id: string;
};
