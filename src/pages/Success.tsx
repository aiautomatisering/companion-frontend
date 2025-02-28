import { Link } from 'react-router-dom';

export const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Subscription Successful!
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        Thank you for subscribing! Your account is now upgraded.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};
