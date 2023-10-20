import { Button, Form, Input, Modal } from 'antd';
import { TPost, TUpdatePostModalProps } from '@/view/posts/types.ts';

const UpdatePostModal = ({
  setIsModalOpen,
  isModalOpen,
  getPost,
  editPost,
  _id,
  id,
  post,
}: TUpdatePostModalProps) => {
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = (values: Pick<TPost, 'title' | 'description' | 'tags'>) => {
    const filteredTags: string[] = values.tags.length
      ? values.tags
          ?.toString()
          ?.split(/[ ,.]/)
          ?.filter((el: string) => el.length)
      : [];

    try {
      editPost({ ...values, tags: filteredTags }, _id);
      getPost(id as string);
      setIsModalOpen(false);
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
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
