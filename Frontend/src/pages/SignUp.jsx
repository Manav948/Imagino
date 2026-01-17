import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios.js'
import {useAuth} from '../context/AuthContext.jsx';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      const res = await api.post('/api/auth/signup', form);
      login(res.data.user, res.data.token);
      toast.success('Sign up successful!');
      navigate('/')
    } catch (error) {
      console.log("Error in SignUp function:", error);
      toast.error(error.response?.data?.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="relative rounded-3xl bg-gradient-to-br from-[#ffffff0a] via-[#ffffff10] to-[#ffffff05] backdrop-blur-md shadow-lg border border-white/10 p-6 md:p-10 w-full max-w-md z-10">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-gradient-to-tr from-green-500 via-yellow-500 to-indigo-500 rounded-full blur-3xl opacity-30 z-0" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gradient-to-tr from-blue-500 via-green-500 to-indigo-500 rounded-full blur-3xl opacity-30 z-0" />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-indigo-500 text-transparent bg-clip-text text-center mb-8">
            Create Your Account
          </h2>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full mb-4 p-3 bg-[#ffffff08] text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mb-4 p-3 bg-[#ffffff08] text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-sm text-gray-300 text-center mt-6">
            Already have an account? <a href="/signin" className="text-pink-400 hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
