import { useEffect, useState } from 'react';
import useStore from '@hooks/useStore.ts';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import CreatePostModal from '@/view/posts/compounds/CreatePostModal.tsx';
import PostItem from '@/view/posts/compounds/PostItem.tsx';

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Posts } = useStore();

  useEffect(() => {
    Posts.getPosts();
  }, []);

  const showModal = () => setIsModalOpen(true);

  return (
    <>
      <Button onClick={showModal} className="bg-[#21201E] ">
        <span className="text-white hover:text-gray-200">
          Create a new post
        </span>
      </Button>

      <div className="flex flex-col mt-3">
        {Posts.posts.map((p) => {
          return <PostItem post={p} />;
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
