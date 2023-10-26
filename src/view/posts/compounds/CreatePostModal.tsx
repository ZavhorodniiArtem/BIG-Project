import { Button, Form, Input, Modal } from 'antd';
import { TCreatePostModalProps, TPost } from '@/view/posts/types.ts';
import CustomTags from '@/shared/components/customTags';
import { useState } from 'react';

const CreatePostModal = ({
  isModalOpen,
  setIsModalOpen,
  createPost,
  getPosts,
}: TCreatePostModalProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setTags([]);
  };

  const handleOk = async (values: Pick<TPost, 'title' | 'description'>) => {
    const body = { ...values, tags: tags };
    try {
      await createPost(body);
      await getPosts();
      setTags([]);
      setIsModalOpen(false);
    } catch (err) {
      console.log('err', err);
    }
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

        <div className="my-5">
          <CustomTags tags={tags} setTags={setTags} />
        </div>

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
