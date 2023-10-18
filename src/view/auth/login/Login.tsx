import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUserFieldsType, LoginFieldType } from '@/view/auth/types';
import useStore from '@hooks/useStore.ts';
import { observer } from 'mobx-react-lite';

const Login = () => {
  const { auth } = useStore();
  const navigate = useNavigate();

  const onFinish = async (values: BaseUserFieldsType) => {
    const body = {
      email: values.email, //'user@gmail.com',
      password: values.password, //'1234567890',
    };
    const data = await auth.logIn(body);
    if (data.token) {
      console.log('dataFE', data);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    }
  };

  return (
    <div>
      <p className="text-[48px] font-bold">Login</p>

      <Form
        name="basic"
        className="mt-10"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<BaseUserFieldsType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue="user@gmail.com" value="user@gmail.com" />
        </Form.Item>

        <Form.Item<BaseUserFieldsType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              whitespace: true,
            },
          ]}
          className="mb-2"
        >
          <Input.Password defaultValue="1234567890" value="1234567890" />
        </Form.Item>

        <Form.Item<LoginFieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 7 }}
          className="mb-2"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7 }}>
          <div className="flex justify-between">
            <Button type="default" htmlType="submit">
              Submit
            </Button>
            <Button type="link" htmlType="button" className="border-blue-500">
              <Link to="/registration">Registration</Link>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Login);
