import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/axios.js'
import { useAuth } from '../context/AuthContext.jsx';
import { Terminal, Cpu, HardDrive } from 'lucide-react';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      const res = await api.post('/api/auth/signup', form);
      login(res.data.user, res.data.token);
      toast.success('Sign up successful!');
      navigate('/generate')
    } catch (error) {
      console.log("Error in SignUp function:", error);
      toast.error(error.response?.data?.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern flex items-center justify-center px-4">
      
      
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span>
        </div>
      </div>
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span>
        </div>
      </div>

      <div className="w-full max-w-4xl z-10">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-800 bg-[#111111]/50 shadow-2xl backdrop-blur-md relative">
          
         
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[#ff4a1c]" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[#ff4a1c]" />

       
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-neutral-800 p-8 flex flex-col justify-between bg-black/30">
            <div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#ff4a1c] mb-6">
                <Cpu className="w-3.5 h-3.5" /> SYSTEM_SPECIFICATIONS
              </div>
              
              <h3 className="text-xl font-editorial font-normal leading-snug mb-4">
                IMAGINO <span className="italic text-neutral-400">NODE_CLUSTER</span>
              </h3>
              
              <p className="text-[10px] text-neutral-400 font-mono leading-relaxed mb-6">
                Create a user key to configure personalized tensors and allocate resources on our high-speed diffusion cluster.
              </p>

              <div className="space-y-4 font-mono text-[9px] text-neutral-500">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
                  <span>FREE_GENERATION_TENSORS</span>
                  <span className="text-neutral-300">10 OBJECTS</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
                  <span>STABILITY_AI_INTEGRATION</span>
                  <span className="text-neutral-300">STABLE_V1_COHESIVE</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
                  <span>CLOUDINARY_HOST_SYNC</span>
                  <span className="text-neutral-300">AUTOMATIC_SECURE</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
                  <span>API_LATENCY_BOUNDS</span>
                  <span className="text-neutral-300">&lt; 3200ms</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-900 hidden lg:block">
              <div className="flex items-center gap-2 text-[9px] font-mono text-neutral-600">
                <HardDrive className="w-3.5 h-3.5" /> <span>NODE: 182.203.4.11:80</span>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="w-full">
           
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-b border-neutral-800/80 pb-3 mb-6">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[#ff4a1c]" /> COMPILER_USER_SETUP
                </span>
                <span className="text-emerald-500">● REGISTRAR_ONLINE</span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-editorial font-normal uppercase tracking-wider">
                  Create <span className="italic text-neutral-400 text-3xl block md:inline">User Identity</span>
                </h2>
              </div>

             
              <div className="mb-4 space-y-1.5">
                <label className="block text-[10px] font-mono text-neutral-400">
                  [01_USERNAME_HANDLE]
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="e.g. operator_beta"
                  required
                  className="w-full p-3 bg-neutral-900/40 text-neutral-200 border border-neutral-800 text-xs font-mono focus:outline-none focus:border-[#ff4a1c] transition-colors"
                />
              </div>

         
              <div className="mb-4 space-y-1.5">
                <label className="block text-[10px] font-mono text-neutral-400">
                  [02_EMAIL_KEY_IDENTIFIER]
                </label>
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

             
              <div className="mb-6 space-y-1.5">
                <label className="block text-[10px] font-mono text-neutral-400">
                  [03_SECURE_PASSPHRASE]
                </label>
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

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 text-xs font-bold uppercase tracking-wider text-white transition-all border ${
                  loading 
                    ? 'bg-neutral-800 border-neutral-700 cursor-not-allowed' 
                    : 'bg-[#ff4a1c] border-[#ff4a1c] hover:brightness-110 active:scale-[0.98]'
                }`}
              >
                {loading ? 'COMPILING IDENTITY...' : 'EXECUTE_REGISTRATION'}
              </button>

             
              <div className="border-t border-neutral-900 mt-6 pt-4 flex justify-between items-center text-[10px] font-mono">
                <span className="text-neutral-500">ALREADY HAVE KEY?</span>
                <Link to="/signin" className="text-[#ff4a1c] hover:underline uppercase tracking-wider font-bold">
                  Access Secure Gate
                </Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
