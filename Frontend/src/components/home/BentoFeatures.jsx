import React from "react";
import { Zap, Lightbulb, Cpu, Grid } from "lucide-react";
import image2 from "../../images/image5.png";

const BentoFeatures = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-24 py-16 z-10 fade-up">
    
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-[#111111] text-xs text-neutral-400 font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
          Core Engine Features
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-normal leading-tight">
          Everything you need to build <span className="italic text-neutral-400">powerful aesthetics</span>
        </h2>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
       
        <div className="md:col-span-4 bg-[#111111]/70 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6 flex flex-col justify-between min-h-[360px] group shadow-lg">
          <div>
            <div className="w-10 h-10 rounded bg-[#ff4a1c]/10 border border-[#ff4a1c]/20 flex items-center justify-center text-[#ff4a1c] mb-6">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sub-Second Generation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Unlock instantaneous creative compile times. Built with compiled PyTorch weights and optimized token execution arrays for faster outputs.
            </p>
          </div>
          
      
          <div className="relative w-full h-32 mt-6 bg-[#0c0c0c] border border-neutral-900 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,74,28,0.08),transparent)]" />
            <div className="relative flex items-center gap-3">
              <span className="text-2xl font-black text-white font-mono tracking-tighter">0.74s</span>
              <span className="text-[10px] text-green-400 font-mono bg-green-950/50 px-2 py-0.5 border border-green-800/30 rounded">LATENCY</span>
            </div>
          </div>
        </div>

      
        <div className="md:col-span-4 flex flex-col gap-6">
  
          <div className="bg-[#111111]/70 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6 flex flex-col justify-between min-h-[168px] group shadow-lg">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#ff4a1c]" /> Suggestion Propts
                </h3>
                <span className="text-[8px] font-mono text-neutral-500">[NODE_LINKED]</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Stuck on ideas? Toggle style recommendations instantly combining cinematic lighting, mood parameters, and artist palettes.
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap mt-4">
              <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded">"Cinematic Lighting"</span>
              <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded">"Cyberpunk"</span>
              <span className="text-[9px] font-mono bg-[#ff4a1c]/10 border border-[#ff4a1c]/25 text-[#ff4a1c] py-0.5 px-2 rounded animate-pulse">"Realistic"</span>
            </div>
          </div>

        
          <div className="bg-[#111111]/70 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6 flex flex-col justify-between min-h-[168px] group shadow-lg">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#ff4a1c]" /> AI prompt Compilers
                </h3>
                <span className="text-[8px] font-mono text-neutral-500">[GUIDE_SCALE]</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Automatically parses raw inputs, structuring guidance tags to align text vectors cleanly with latent image layers.
              </p>
            </div>
            
            <div className="h-1 w-full bg-neutral-900 rounded overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-[#ff4a1c] w-3/4 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#111111]/70 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl p-6 flex flex-col justify-between min-h-[360px] group shadow-lg">
          <div>
            <div className="w-10 h-10 rounded bg-[#ff4a1c]/10 border border-[#ff4a1c]/20 flex items-center justify-center text-[#ff4a1c] mb-6">
              <Grid className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High-Fidelity Showcases</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Review generated pieces in high dynamic contrast. Add creations to our global trending carousel or download lossy-free JPG exports.
            </p>
          </div>
          
      
          <div className="relative w-full h-32 mt-6 rounded-lg overflow-hidden border border-neutral-900">
            <img 
              src={image2} 
              alt="Showcase crop" 
              className="w-full h-full object-cover opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
              <span className="text-[8px] font-mono text-neutral-400">1024x1024_PNG</span>
              <span className="text-[8px] font-mono text-[#ff4a1c]">DOWNLOAD_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
