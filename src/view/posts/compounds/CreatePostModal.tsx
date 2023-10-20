import { Button, Form, Input, Modal } from 'antd';
import { TCreatePostModalProps, TPost } from '@/view/posts/types.ts';

const CreatePostModal = ({
  isModalOpen,
  setIsModalOpen,
  createPost,
}: TCreatePostModalProps) => {
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = (values: Pick<TPost, 'title' | 'description' | 'tags'>) => {
    const filteredTags: string[] = values.tags
      ?.toString()
      ?.split(/[ ,.]/)
      ?.filter((el: string) => el.length);

    createPost({ ...values, tags: filteredTags }).then(() =>
      setIsModalOpen(false),
    );
  };

  return (
    <Modal
      title="Create a new post"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name="post"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={handleOk}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Tags" name="tags" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="default"
            htmlType="button"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
