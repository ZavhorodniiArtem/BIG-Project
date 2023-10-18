import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import useStore from '@hooks/useStore.ts';

const Post = () => {
  const { myPosts } = useStore();
  const params = useParams();

  console.log('myPost', toJS(myPosts.post));

  useEffect(() => {
    if (params.id) {
      myPosts.getPost(params.id);
    }
  }, []);

  return (
    <>
      <h1>Post</h1>

      <h2 className="text-xl">{myPosts.post.title}</h2>
      <h3>{myPosts.post.description}</h3>
      <h4>{myPosts.post.author.userName}</h4>
    </>
  );
};

export default observer(Post);
