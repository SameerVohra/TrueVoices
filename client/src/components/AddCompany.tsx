import { useState } from "react";
import axios from "axios";
import link from "../assets/link.json";

const AddCompany: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [web, setWeb] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem("token");
    const email: string | null = localStorage.getItem("email");

    if (!token) {
      setErr("LOGIN TO CONTINUE");
      return;
    }
    try {
      const reviewURL: string = "url";
      const addComp = async () => {
        console.log(name, about, email, web, reviewURL);
        const res = await axios.post(
          `${link.url}/register-company`,
          {
            compName: name,
            about: about,
            email: email,
            compURL: web,
            reviewURL: reviewURL,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res);
      };
      addComp();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-8 rounded-xl shadow-gray-400 shadow-2xl max-w-lg w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Add Company</h1>
        
        {err && <h2 className="text-red-500 text-center mb-4">{err}</h2>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Company Name"
              className="w-full p-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.currentTarget.value)}
              placeholder="Tell Us about the company"
              className="w-full p-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>
          <div>
            <input
              type="text"
              value={web}
              onChange={(e) => setWeb(e.currentTarget.value)}
              placeholder="https://xyz.com"
              className="w-full p-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-400"
            >
              ADD COMPANY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
