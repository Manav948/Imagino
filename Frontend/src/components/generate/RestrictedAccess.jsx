import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RestrictedAccess = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">
      
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span>
        </div>
      </div>
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-800/80 relative mb-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl bg-[#111111]/70 border border-neutral-800 p-8 md:p-12 w-full max-w-lg z-10 text-center"
        >
          <div className="w-12 h-12 bg-[#ff4a1c]/10 border border-[#ff4a1c]/25 rounded flex items-center justify-center mx-auto mb-6 text-xl">
            🔒
          </div>
          <h2 className="text-2xl font-editorial font-normal mb-4">
            Workspace Access Restricted
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed mb-8">
            Authentication key required. Please sign in to compile prompt tensors and utilize our latent diffusion cluster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signin" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#ff4a1c] text-white hover:brightness-110 active:scale-95 transition rounded">
                Sign In
              </button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider border border-neutral-800 hover:bg-neutral-900 text-neutral-300 rounded transition">
                Register
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestrictedAccess;
