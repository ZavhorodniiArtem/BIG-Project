import { Link } from 'react-router-dom';
import notFoundImg from '@assets/img/notFound.jpg';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={notFoundImg} alt="notFound" className="w-1/4" />
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white rounded"
      >
        Go to main page
      </Link>
    </div>
  );
};

export default NotFound;
