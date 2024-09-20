import React from 'react'
import { useNavigate } from 'react-router-dom';

interface CompDetails {
  compName: string;
  compId: string;
}

const CompanyDetails: React.FC<CompDetails> = ({ compName, compId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-start w-full max-w-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        <span className="text-blue-600">Name: </span>{compName}
      </h1>
      <h2 className="text-lg text-gray-600 mb-4">
        <span className="font-semibold text-gray-700">ID: </span>{compId}
      </h2>
      <button
        onClick={() => navigate(`/reviews/${compName}?id=${compId}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
      >
        Show Reviews
      </button>
    </div>
  );
}

export default CompanyDetails;
