import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TPostItemProps } from '@/view/posts/types.ts';

const PostItem = ({ post, isConfirmDelete }: TPostItemProps) => {
  const navigate = useNavigate();

  const { title, description, tags, author, _id } = post;

  return (
    <div
      key={post._id}
      className="border-blue-950 border-2 mt-2 p-4 rounded-2xl cursor-pointer hover:bg-blue-100"
      onClick={() => navigate(`/posts/${_id}`)}
    >
      <p className="text-blue-700 mb-2 text-xl">{title}</p>
      <p className="text-blue-800 mt-4">{description}</p>
      <p className="text-blue-800 mt-4 mb-1">
        Tags: {tags.join(', ') || 'No customTags'}
      </p>
      <p className="text-blue-800 font-bold">Author: {author.userName}</p>

      <Button
        type="dashed"
        className="mt-3"
        onClick={(event) => isConfirmDelete(event, _id)}
      >
        Delete post
      </Button>
    </div>
  );
};
export default PostItem;
