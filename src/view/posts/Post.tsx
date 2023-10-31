import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStore from '@hooks/useStore.ts';
import UpdatePostModal from '@/view/posts/compounds/UpdatePostModal.tsx';
import ConfirmDeleteModal from '@/view/posts/compounds/ConfirmDeleteModal.tsx';
import { format } from 'date-fns';
import { EditOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { Posts } = useStore();
  const params = useParams();

  const showModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (params.id) {
      Posts.getPost(params.id);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col px-10 bg-gray-50 rounded-2xl py-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar size={40} icon={<UserOutlined />} />
            <div className="ml-3">
              <p className="font-medium">{Posts.post.author.userName}</p>
              <p className="text-gray-500 text-xs">
                Posted on
                <span className="pl-1">
                  {format(new Date(Posts.post.createdAt || 0), 'dd.MM.yy')}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="flex gap-3 cursor-pointer border rounded px-3 hover:bg-gray-100 mr-3"
              onClick={showModal}
            >
              <p>Edit post</p>
              <EditOutlined />
            </div>

            <div
              className="flex gap-3 cursor-pointer border rounded px-3 hover:bg-gray-100"
              onClick={() => setIsConfirmOpen(true)}
            >
              <p>Delete post</p>
            </div>
          </div>
        </div>

        <h1 className="text-[48px] font-semibold mt-6">{Posts.post.title}</h1>

        <div className="flex gap-2">
          {Posts.post.tags.map((tag: string) => {
            return <span key={tag}>#{tag}</span>;
          })}
        </div>

        <h2 className="text-[20px] font-medium mt-5">
          {Posts.post.description}
        </h2>
      </div>

      <div className="ml-10 mt-3">
        <EyeOutlined />
        <span className="ml-1">{Posts.post.viewsCount}</span>
      </div>

      <UpdatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getPost={Posts.getPost}
        editPost={Posts.editPost}
        _id={Posts.post._id}
        id={params.id}
        post={Posts.post}
      />
      <ConfirmDeleteModal
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        deletePost={Posts.deletePost}
        getPosts={Posts.getPosts}
        id={Posts.post._id}
      />
    </>
  );
};

export default observer(Post);
