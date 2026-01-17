import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios.js'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/auth/signIn', form);
      login(res.data.user, res.data.token)
      toast.success("Logged in successfully");
      navigate('/');
    } catch (error) {
      console.log("Error in SignIn function:", error);
      toast.error(error.response?.data?.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#ffffff0a] via-[#ffffff10] to-[#ffffff05] backdrop-blur-md shadow-lg border border-white/10 p-6 md:p-10 w-full max-w-md z-10">
        <div className="absolute -top-8 -left-10 w-52 h-52 bg-gradient-to-tr from-green-500 via-yellow-500 to-indigo-500 rounded-full blur-3xl opacity-30 z-0" />
        <div className="absolute -bottom-8 -right-10 w-52 h-52 bg-gradient-to-tr from-blue-500 via-green-500 to-indigo-500 rounded-full blur-3xl opacity-30 z-0" />
        <form onSubmit={handleSubmit} className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-indigo-500 text-transparent bg-clip-text text-center mb-8">
            Welcome Back
          </h2>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mb-4 p-3 bg-[#ffffff08] text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full mb-6 p-3 bg-[#ffffff08] text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white rounded transition duration-300 ${loading ? 'bg-gray-500' : 'bg-gradient-to-r from-purple-500 to-green-500 hover:opacity-90'}`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className="text-sm text-gray-300 text-center mt-6">
            Don't have an account? <a href="/signup" className="text-pink-400 hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
