import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import useStore from '@hooks/useStore.ts';
import { Button, Form, Input, Modal } from 'antd';
import { PostType } from '@/view/posts/types.ts';

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Posts } = useStore();
  const navigate = useNavigate();

  console.log('myPosts', toJS(Posts.posts));

  useEffect(() => {
    Posts.getPosts().then(() => setIsModalOpen(false));
  }, []);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const deletePost = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    event.stopPropagation();
    await Posts.deletePost(id);
    Posts.getPosts();
  };

  const handleOk = (
    values: Pick<PostType, 'title' | 'description' | 'tags'>,
  ) => {
    const filteredTags: string[] = values.tags
      .toString()
      ?.split(/[ ,.]/)
      ?.filter((el: string) => el.length);

    Posts.createPost({ ...values, tags: filteredTags }).then(() =>
      setIsModalOpen(false),
    );
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new post
      </Button>

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

      <div>
        {Posts.posts.map((p) => {
          return (
            <div
              key={p._id}
              className="border-blue-950 border-2 mt-2 p-4 rounded-2xl cursor-pointer hover:bg-blue-100"
              onClick={() => navigate(`/posts/${p._id}`)}
            >
              <p className="text-blue-700 mb-2 text-xl">Title: {p.title}</p>
              <p className="text-blue-800">Description: {p.description}</p>
              <p className="text-blue-800 my-1">
                Tags: {p.tags.join(', ') || 'No tags'}
              </p>
              <p className="text-blue-800 font-bold">
                Author: {p.author.userName}
              </p>

              <Button
                type="dashed"
                className="mt-3"
                onClick={(e) => deletePost(e, p._id)}
              >
                Delete post
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default observer(Posts);
