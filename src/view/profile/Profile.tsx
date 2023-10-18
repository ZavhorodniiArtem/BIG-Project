import { observer } from 'mobx-react-lite';
import useStore from '@hooks/useStore.ts';
import { toJS } from 'mobx';
import { useEffect } from 'react';

const Profile = () => {
  const { auth } = useStore();

  console.log('me', toJS(auth.me));

  useEffect(() => {
    auth.getMe();
  }, []);

  return (
    <div>
      <h1>Profile page</h1>
      <h2>Avatar</h2>
      <h2>userName</h2>
      <h2>birthday</h2>
    </div>
  );
};

export default observer(Profile);
