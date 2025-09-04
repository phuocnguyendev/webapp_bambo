import { TriangleAlert } from 'lucide-react';
import React from 'react';

const ErrorFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <TriangleAlert className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Something went wrong
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We're sorry for the inconvenience. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
