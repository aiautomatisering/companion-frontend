import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-blue-500">404</h1>
      <p className="text-xl text-gray-700 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};
