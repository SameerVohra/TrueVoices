import axios from 'axios';
import React, { useEffect, useState } from 'react';
import link from '../assets/link.json';
import CompanyDetails from './CompanyDetails';
import { useNavigate } from 'react-router-dom';

interface Company {
  compName: string;
  companyId: string;
}

const Home: React.FC = () => {
  const [comp, setComp] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email: string | null = localStorage.getItem("email");
    const token: string | null = localStorage.getItem("token");

    const fetchCompanies = async () => {
      try {
        const response = await axios.post(
          `${link.url}/get-companies`,
          { email },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const companies = response.data;

        if (Array.isArray(companies)) {
          setComp(companies);
        } else {
          setComp([companies]);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    if (email && token) {
      fetchCompanies();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Company Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {comp.map((company, ind) => (
          <CompanyDetails compName={company.compName} compId={company.companyId} key={ind} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/add-company")}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          ADD A NEW COMPANY
        </button>
      </div>
    </div>
  );
};

export default Home;
