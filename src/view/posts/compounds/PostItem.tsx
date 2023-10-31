import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TPostItemProps } from '@/view/posts/types.ts';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

const PostItem = ({ post }: TPostItemProps) => {
  const navigate = useNavigate();

  const { title, tags, author, _id, createdAt, viewsCount } = post;

  return (
    <div
      key={post._id}
      className="bg-white mt-2 p-6 rounded-2xl cursor-pointer hover:bg-zinc-50"
      onClick={() => navigate(`/posts/${_id}`)}
    >
      <div className="flex items-center">
        <Avatar size={40} icon={<UserOutlined />} />
        <div className="ml-3">
          <p className="font-medium">{author.userName}</p>
          <p className="text-gray-500 text-xs">
            {format(new Date(createdAt || 0), 'dd.MM.yy')}
          </p>
        </div>
      </div>

      <div className="mt-6 px-10">
        <p className="mb-2 text-[48px]">{title}</p>
        <div className="flex gap-2">
          {tags.map((tag) => {
            return <p key={tag}>#{tag}</p>;
          })}
        </div>
      </div>

      <div className="flex items-center px-10 mt-6">
        <EyeOutlined />
        <span className="ml-1">{viewsCount}</span>
      </div>
    </div>
  );
};
export default PostItem;
