import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import useStore from '@hooks/useStore.ts';
import { format } from 'date-fns';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Posts } = useStore();
  const params = useParams();

  console.log('myPost', toJS(Posts.post));

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async (values: any) => {
    const filteredTags = values.tags.length
      ? values.tags?.split(/[ ,.]/)?.filter((el: string) => el.length)
      : [];

    console.log('filteredTags', filteredTags);

    try {
      await Posts.editPost({ ...values, tags: filteredTags }, Posts.post._id);
      await Posts.getPost(params.id as string);
      setIsModalOpen(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    if (params.id) {
      Posts.getPost(params.id);
    }
  }, []);

  return (
    <>
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
            title: Posts.post.title,
            description: Posts.post.description,
            tags: Posts.post.tags || '',
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
    </>
  );
};

export default observer(Post);
