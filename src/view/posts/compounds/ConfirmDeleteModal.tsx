import { Button, Modal } from 'antd';
import { TConfirmDelete } from '@/view/posts/types.ts';

const ConfirmDeleteModal = ({
  isConfirmOpen,
  setIsConfirmOpen,
  getPosts,
  isDeletedId,
  deletePost,
}: TConfirmDelete) => {
  const handleDeletePost = async () => {
    await deletePost(isDeletedId);
    await getPosts();
    setIsConfirmOpen(false);
  };

  return (
    <Modal
      title="Are you sure?"
      open={isConfirmOpen}
      footer={null}
      onCancel={() => setIsConfirmOpen(false)}
    >
      <div className="flex justify-between mt-10">
        <Button type="primary" onClick={handleDeletePost}>
          Delete
        </Button>
        <Button type="default" onClick={() => setIsConfirmOpen(false)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
