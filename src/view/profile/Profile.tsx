import { observer } from 'mobx-react-lite';
import useStore from '@hooks/useStore.ts';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

const Profile = () => {
  const { auth } = useStore();

  console.log('me', toJS(auth.me));

  useEffect(() => {
    auth.getMe();
  }, []);

  return (
    <div className="flex flex-col relative">
      <div className="absolute inset-0 flex justify-center">
        <Avatar
          size={120}
          icon={<UserOutlined />}
          className="border-4 border-black z-10"
        />
      </div>

      <div className="bg-white rounded-2xl mt-16 pb-6">
        <div className="flex justify-end items-end">
          <Button type="primary" className="mt-6 mr-6 ">
            Edit profile
          </Button>
        </div>

        <div className="flex flex-col items-center mt-10">
          <p className="text-[32px]">{auth.me.userName || 'User'}</p>

          <p className="text-[24px] my-4">{auth.me.birthday || 'birthday'}</p>

          <p className="text-[24px]">{auth.me.email || 'email'}</p>

          <div className="flex mt-6">
            <UserAddOutlined />
            <p className="text-gray-500 pl-2">
              Joined on
              <span className="pl-1">
                {format(new Date(auth.me.createdAt || 0), 'dd.MM.yy')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
