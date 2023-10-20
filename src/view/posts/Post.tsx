import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import useStore from '@hooks/useStore.ts';
import { format } from 'date-fns';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import UpdatePostModal from '@/view/posts/compounds/UpdatePostModal.tsx';

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Posts } = useStore();
  const params = useParams();

  console.log('myPost', toJS(Posts.post));

  const showModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (params.id) {
      Posts.getPost(params.id);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col px-10 bg-gray-50 rounded-2xl py-3">
        <h1 className="text-center text-[24px] font-semibold">
          {Posts.post.title}
        </h1>

        <h2 className="text-[20px] font-medium mt-5">
          {Posts.post.description}
        </h2>

        <div className="flex justify-between mt-5 w-full">
          <div className="flex items-center">
            <EyeOutlined />
            <span className="ml-2">{Posts.post.viewsCount}</span>
          </div>

          <div className="flex flex-col">
            <p>{Posts.post.author.userName}</p>
            <p>
              {format(new Date(Posts.post.createdAt || 0), 'dd.MM.yy HH:mm')}
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full mt-4 gap-10">
          <div className="flex gap-2">
            {Posts.post.tags.map((tag: string) => {
              return <span key={tag}>#{tag}</span>;
            })}
          </div>

          <div
            className="flex gap-3 cursor-pointer border rounded px-3 hover:bg-gray-100"
            onClick={showModal}
          >
            <p>Edit post</p>
            <EditOutlined />
          </div>
        </div>
      </div>

      <UpdatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getPost={Posts.getPosts}
        editPost={Posts.editPost}
        _id={Posts.post._id}
        id={params.id}
        post={Posts.post}
      />
    </>
  );
};

export default observer(Post);