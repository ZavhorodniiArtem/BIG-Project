import React, { useEffect, useState } from 'react';
import useStore from '@hooks/useStore.ts';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import CreatePostModal from '@/view/posts/compounds/CreatePostModal.tsx';
import PostItem from '@/view/posts/compounds/PostItem.tsx';
import ConfirmDeleteModal from '@/view/posts/compounds/ConfirmDeleteModal.tsx';

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeletedId, setIsDeletedId] = useState('');

  const { Posts } = useStore();

  useEffect(() => {
    Posts.getPosts();
  }, []);

  const showModal = () => setIsModalOpen(true);
  const showConfirm = () => setIsConfirmOpen(true);

  const isConfirmDelete = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    event.stopPropagation();
    showConfirm();
    setIsDeletedId(id);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new post
      </Button>

      <div className="flex flex-col mt-3">
        {Posts.posts.map((p) => {
          return <PostItem post={p} isConfirmDelete={isConfirmDelete} />;
        })}
      </div>

      <CreatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        createPost={Posts.createPost}
        getPosts={Posts.getPosts}
      />

      <ConfirmDeleteModal
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        deletePost={Posts.deletePost}
        getPosts={Posts.getPosts}
        isDeletedId={isDeletedId}
      />
    </>
  );
};

export default observer(Posts);
