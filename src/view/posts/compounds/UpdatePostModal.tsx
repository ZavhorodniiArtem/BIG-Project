import { Button, Form, Input, Modal } from 'antd';
import { TPost, TUpdatePostModalProps } from '@/view/posts/types.ts';
import CustomTags from '@/shared/components/customTags';
import { useState } from 'react';

const UpdatePostModal = ({
  setIsModalOpen,
  isModalOpen,
  getPost,
  editPost,
  _id,
  id,
  post,
}: TUpdatePostModalProps) => {
  const [tags, setTags] = useState<string[]>(post.tags);

  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async (values: Pick<TPost, 'title' | 'description'>) => {
    try {
      await editPost({ ...values, tags: tags }, _id);
      await getPost(id as string);
      handleCancel();
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Modal
      title="Edit post"
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
        initialValues={{
          title: post.title,
          description: post.description,
          tags: post.tags || '',
        }}
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
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
