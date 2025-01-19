import React from 'react';
import { Link } from 'gatsby';

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Pebbles Flexible Commands Editor
        </h1>
        <div className="space-y-4">
          <Link
            to="/command-editor"
            className="block bg-blue-500 text-white text-center py-3 rounded shadow hover:bg-blue-600 hover:scale-105 transform transition duration-100 ease-in-out"
          >
            Command Editor
          </Link>
          <Link
            to="/info-command-editor"
            className="block bg-green-500 text-white text-center py-3 rounded shadow hover:bg-green-600 hover:scale-105 transform transition duration-100 ease-in-out"
          >
            Info Command Editor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
