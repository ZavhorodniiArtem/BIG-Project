import React, { useEffect, useState } from 'react';
import useStore from '@hooks/useStore.ts';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Button } from 'antd';
import CreatePostModal from '@/view/posts/compounds/CreatePostModal.tsx';
import PostItem from '@/view/posts/compounds/PostItem.tsx';

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Posts } = useStore();

  console.log('myPosts', toJS(Posts.posts));

  useEffect(() => {
    Posts.getPosts();
  }, []);

  const showModal = () => setIsModalOpen(true);

  const deletePost = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    event.stopPropagation();
    await Posts.deletePost(id);
    await Posts.getPosts();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new post
      </Button>

      <div className="flex flex-col mt-3">
        {Posts.posts.map((p) => {
          return <PostItem post={p} deletePost={deletePost} />;
        })}
      </div>

      <CreatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        createPost={Posts.createPost}
        getPosts={Posts.getPosts}
      />
    </>
  );
};

export default observer(Posts);
