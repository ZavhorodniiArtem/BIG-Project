export type Author = {
  _id: string;
  userName: string;
};

export type PostType = {
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
