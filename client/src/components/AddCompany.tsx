import axios from "axios";
import { useState } from "react";
import link from "../assets/link.json";
import { GenerateURL } from "./GenerateURL";
import { v4 as uuidv4 } from "uuid";

const AddCompany: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [compLink, setCompLink] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic form validation
    if (!name || !about || !compLink) {
      setError("All fields are required");
      return;
    }

    try {
      const email: string | null = localStorage.getItem("email");
      const token: string | null = localStorage.getItem("token");
      if (!email || !token) {
        setError("You must be logged in to submit a company.");
        return;
      }
      const compID: string = uuidv4();
      const compURL: string = GenerateURL({ compName: name, compId: compID });

      const res = await axios.post(
        `${link.url}/register-company`,
        {
          compName: name,
          reviewURL: compURL,
          email: email,
          about: about,
          compURL: compLink,
          companyId: compID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Company added successfully!");
      setName("");
      setAbout("");
      setCompLink("");
      console.log(res);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-10 px-4">
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          Add a New Company
        </h1>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Company Name"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">About the Company</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.currentTarget.value)}
            placeholder="Tell us about the company"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Company URL</label>
          <input
            type="text"
            value={compLink}
            onChange={(e) => setCompLink(e.currentTarget.value)}
            placeholder="https://xyz.com"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded transition-colors"
        >
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
