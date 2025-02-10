import { Link } from 'react-router-dom';

export const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-red-500">403</h1>
      <p className="text-xl text-gray-700 mt-2">
        You don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Return to Home
      </Link>
    </div>
  );
};
