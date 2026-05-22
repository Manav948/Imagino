import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios.js'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldAlert, Terminal, KeyRound } from 'lucide-react';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      navigate('/generate');
    } catch (error) {
      console.log("Error in SignIn function:", error);
      toast.error(error.response?.data?.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern flex items-center justify-center px-4">
      
      {/* Border Rulers */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span>
        </div>
      </div>
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span>
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="relative border border-neutral-800 bg-[#111111]/70 p-8 md:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Accent Corner Brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[#ff4a1c]" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[#ff4a1c]" />

          <form onSubmit={handleSubmit}>
            {/* Header Telemetry */}
            <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-b border-neutral-800/80 pb-3 mb-6">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-[#ff4a1c]" /> GATEWAY_SECURE_AUTH_V1.0
              </span>
              <span className="text-[#ff4a1c] animate-pulse">● IDLE</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-editorial font-normal uppercase tracking-wider">
                User <span className="italic text-neutral-400 text-3xl block md:inline">Access Gate</span>
              </h2>
              <p className="text-[10px] font-mono text-neutral-500 mt-2">
                COMPILE CREDENTIALS FOR COMPILER ACCESS
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-4 space-y-1.5">
              <label className="block text-[10px] font-mono text-neutral-400">
                [01_EMAIL_KEY_IDENTIFIER]
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="identity@imagino.local"
                  required
                  className="w-full p-3 bg-neutral-900/40 text-neutral-200 border border-neutral-800 text-xs font-mono focus:outline-none focus:border-[#ff4a1c] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6 space-y-1.5">
              <label className="block text-[10px] font-mono text-neutral-400">
                [02_SECURE_PASSPHRASE]
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full p-3 bg-neutral-900/40 text-neutral-200 border border-neutral-800 text-xs font-mono focus:outline-none focus:border-[#ff4a1c] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-xs font-bold uppercase tracking-wider text-white transition-all border ${
                loading 
                  ? 'bg-neutral-800 border-neutral-700 cursor-not-allowed' 
                  : 'bg-[#ff4a1c] border-[#ff4a1c] hover:brightness-110 active:scale-[0.98]'
              }`}
            >
              {loading ? 'AUTHENTICATING...' : 'EXECUTE_SIGN_IN'}
            </button>

            {/* Footer Navigation */}
            <div className="border-t border-neutral-900 mt-6 pt-4 flex justify-between items-center text-[10px] font-mono">
              <span className="text-neutral-500">NO KEY REGISTERED?</span>
              <Link to="/signup" className="text-[#ff4a1c] hover:underline uppercase tracking-wider font-bold">
                Create User Tensor
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
