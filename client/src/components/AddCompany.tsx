import React, { useState } from 'react';
import link from "../assets/link.json";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCompany: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email: string | null = localStorage.getItem("email");
    const token: string | null = localStorage.getItem("token");

    try {
      console.log(token)
      const res = await axios.post(
        `${link.url}/register-company`,
        {
          compName: name,
          reviewURL: "url",
          email: email,
          about: about,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(res)
      if(res.status === 201){
        setName("");
        setAbout("");
        navigate("/home");
      }
      console.log("Company added successfully:", res.data);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Add a New Company</h1>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="About company"
            value={about}
            onChange={(e) => setAbout(e.currentTarget.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
