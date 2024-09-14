
import axios from "axios";
import { useState } from "react";
import link from "../assets/link.json";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post(`${link.url}/login`, { username, password });
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.authToken);
        localStorage.setItem("email", res.data.email);        
        navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErr(error.response.data.message || "An error occurred");
      } else {
        setErr("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-300 via-cyan-800 to-blue-800 p-6">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
        {err && <h1 className="text-red-500 text-lg text-center mb-4">{err}</h1>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-900 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <h1 
          className="mt-5 text-right text-blue-400 cursor-pointer hover:text-blue-700 transition-all duration-200 ease-in-out"
          onClick={() => navigate("/register")}
        >
          REGISTER
        </h1>
      </div>
    </div>
  );
};

export default Login;

