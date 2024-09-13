import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import link from "../assets/link.json";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");

    if (password !== confirmPass) {
      setErr("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(`${link.url}/register`, {
        username,
        email,
        password,
      });

      if (res.status === 200) {
        navigate("/login");
      } else {
        setErr(res.data.message || "An error occurred during registration.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErr(error.response.data.message || "An error occurred during registration.");
      } else {
        setErr("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
        {err && <h1 className='text-red-500 text-center text-lg mb-4 font-medium'>{err}</h1>}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder='Username'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='Email'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Password'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.currentTarget.value)}
              placeholder='Confirm Password'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md'
          >
            Register
          </button>
        </form>
        <h1
          className="cursor-pointer text-blue-500 text-center mt-6 hover:text-blue-700 transition-all delay-75"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </h1>
      </div>
    </div>
  );
};

export default Register;
