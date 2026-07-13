import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="relative max-w-7xl mx-auto px-6 md:px-24 pt-20 pb-12 z-10">
     
      <div className="w-full h-[1px] bg-neutral-800/80 relative mb-16">
        <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <div className="flex flex-col items-center mb-16 text-center">
        <div className="w-12 h-12 bg-[#ff4a1c] rounded flex items-center justify-center font-black text-black text-2xl mb-4">
          I
        </div>
        <h3 className="text-2xl font-editorial font-normal mb-1">
          Designed & developed for <span className="italic">Imagino AI</span>
        </h3>
        <p className="text-xs text-neutral-500 font-mono">CODEBASE_VERSION_1.0.4</p>
        <div className="flex gap-4 mt-6">
          <a href="https://github.com/Manav948/Imagino" className="p-2 border border-neutral-800 hover:bg-neutral-900 rounded-full text-neutral-400 hover:text-white transition">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://x.com/ManavValani" className="p-2 border border-neutral-800 hover:bg-neutral-900 rounded-full text-neutral-400 hover:text-white transition">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/manavvalani/" className="p-2 border border-neutral-800 hover:bg-neutral-900 rounded-full text-neutral-400 hover:text-white transition">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-neutral-800/80 pt-12 text-left">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Product</h4>
          <ul className="space-y-2 text-xs text-neutral-500">
            <li><Link to="/generate" className="hover:text-white transition">Playground</Link></li>
            <li><a href="#" className="hover:text-white transition">API Keys</a></li>
            <li><a href="#" className="hover:text-white transition">Models</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing Credits</a></li>
          </ul>
        </div>

        <div className="space-y-4 md:border-l md:border-neutral-800/80 md:pl-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Resources</h4>
          <ul className="space-y-2 text-xs text-neutral-500">
            <li><a href="#" className="hover:text-white transition">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition">Guides</a></li>
            <li><a href="#" className="hover:text-white transition">Model Zoo</a></li>
            <li><a href="#" className="hover:text-white transition">System Status</a></li>
          </ul>
        </div>

        <div className="space-y-4 md:border-l md:border-neutral-800/80 md:pl-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Developers</h4>
          <ul className="space-y-2 text-xs text-neutral-500">
            <li><a href="#" className="hover:text-white transition">API Reference</a></li>
            <li><a href="#" className="hover:text-white transition">SDKs</a></li>
            <li><a href="#" className="hover:text-white transition">GitHub Repo</a></li>
            <li><a href="#" className="hover:text-white transition">Discussions</a></li>
          </ul>
        </div>

        <div className="space-y-4 md:border-l md:border-neutral-800/80 md:pl-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Legal</h4>
          <ul className="space-y-2 text-xs text-neutral-500">
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">License</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-[10px] text-neutral-600 font-mono mt-16">
        &copy; {new Date().getFullYear()} Imagino AI. Built with premium tech blueprint style.
      </p>
    </footer>
  );
};

export default HomeFooter;
