import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUserFieldsType } from '@/view/auth/types';
import useStore from '@hooks/useStore.ts';

const Registration = () => {
  const { auth } = useStore();
  const navigate = useNavigate();

  const onFinish = (values: BaseUserFieldsType) => {
    const body = { email: values.username, password: values.password };
    auth.register(body).then(() => navigate('/login'));
  };

  return (
    <div>
      <p className="text-[48px] font-bold">Registration</p>

      <Form
        name="basic"
        className="mt-10"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<BaseUserFieldsType>
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<BaseUserFieldsType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              whitespace: true,
              min: 4,
            },
          ]}
          className="mb-2"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }} className="mt-8">
          <div className="flex justify-between">
            <Button type="default" htmlType="submit">
              Registration
            </Button>
            <Button type="link" htmlType="button" className="border-blue-500">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
