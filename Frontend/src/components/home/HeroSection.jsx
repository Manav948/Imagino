import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import image1 from "../../images/image4.png";

const HeroSection = ({ user, userName }) => {
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <section className="relative px-6 md:px-24 py-16 md:py-28 max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <div className="lg:col-span-7 flex flex-col items-start text-left">
      
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neutral-800 bg-[#111111]/85 text-xs text-neutral-400 font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ff4a1c] animate-ping" />
          IMAGINO.ENGINE_V1.4
        </div>

    
        <h1 className="text-4xl sm:text-6xl font-normal leading-tight text-white mb-6 font-editorial">
          Your prompts aren't linear.
          <br />
          <span className="text-neutral-400 italic">Your engine shouldn't be either.</span>
        </h1>

     
        <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
          A graph-based latency diffusion engine built with prompt suggestion nodes, 
          model checkpointing, and instant asset compile. Designed for production-level AI art creations.
        </p>

    
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          {user ? (
            <div className="flex flex-col items-start gap-3">
              <span className="text-xs text-neutral-500 font-mono">
                ACTIVE_USER: <span className="text-[#ff4a1c] font-semibold">{userName}</span>
              </span>
              <Link to="/generate">
                <button className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-[#ff4a1c] text-white hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,74,28,0.25)] rounded">
                  Open Playground <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/signin" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider bg-[#ff4a1c] text-white hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,74,28,0.25)] rounded">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider border border-neutral-800 hover:bg-neutral-900 text-neutral-300 rounded transition-all">
                  Create Account
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

    
      <div className="lg:col-span-5 flex items-center justify-center w-full relative">
        <div className="relative w-full max-w-sm h-[420px] flex items-center justify-center perspective-1200">
          
   
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-all duration-700 pointer-events-none ${
            heroHovered ? "w-80 h-80 bg-[#ff4a1c]/20" : "w-64 h-64 bg-[#ff4a1c]/10"
          }`} />

      
          <div 
            className="relative w-72 h-72 animate-float-simple pointer-events-auto cursor-pointer preserve-3d"
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
           
            <div 
              className="absolute inset-0 preserve-3d transition-3d"
              style={{
                transform: heroHovered 
                  ? "rotateX(53deg) rotateY(0deg) rotateZ(-45deg) scale(1.05)" 
                  : "rotateX(53deg) rotateY(0deg) rotateZ(-45deg)",
              }}
            >
              
            
              <div 
                className="absolute inset-0 pointer-events-none preserve-3d transition-3d"
                style={{ transform: `translateZ(${heroHovered ? -30 : 0}px)` }}
              >
          
                <div 
                  className="absolute left-0 top-0 h-[1px] bg-gradient-to-r from-[#ff4a1c] via-[#ff4a1c]/40 to-transparent transition-3d"
                  style={{
                    width: heroHovered ? "200px" : "80px",
                    transformOrigin: "left center",
                    transform: "rotateY(90deg)"
                  }}
                />
         
                <div 
                  className="absolute right-0 top-0 h-[1px] bg-gradient-to-l from-[#ff4a1c] via-[#ff4a1c]/40 to-transparent transition-3d"
                  style={{
                    width: heroHovered ? "200px" : "80px",
                    transformOrigin: "right center",
                    transform: "rotateY(-90deg)"
                  }}
                />
              
                <div 
                  className="absolute left-0 bottom-0 h-[1px] bg-gradient-to-r from-[#ff4a1c] via-[#ff4a1c]/40 to-transparent transition-3d"
                  style={{
                    width: heroHovered ? "200px" : "80px",
                    transformOrigin: "left center",
                    transform: "rotateY(90deg)"
                  }}
                />
                
                <div 
                  className="absolute right-0 bottom-0 h-[1px] bg-gradient-to-l from-[#ff4a1c] via-[#ff4a1c]/40 to-transparent transition-3d"
                  style={{
                    width: heroHovered ? "200px" : "80px",
                    transformOrigin: "right center",
                    transform: "rotateY(-90deg)"
                  }}
                />
              </div>

          
              <div 
                className="absolute inset-0 bg-[#0d0d0d]/90 border border-neutral-800 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between p-4 transition-3d preserve-3d"
                style={{ 
                  transform: `translateZ(${heroHovered ? -30 : 0}px)`,
                  boxShadow: heroHovered ? "0 20px 40px rgba(0,0,0,0.9)" : "0 5px 15px rgba(0,0,0,0.7)"
                }}
              >
               
                <div className="absolute inset-2 rounded-lg opacity-40 bg-[linear-gradient(rgba(255,74,28,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,74,28,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

             
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#ff4a1c]/60" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#ff4a1c]/60" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#ff4a1c]/60" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#ff4a1c]/60" />

                <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 relative z-10">
                  <span>[BASE_TENSOR_GRID]</span>
                  <span className="text-[#ff4a1c]/70">[4x4_NODE_MATRIX]</span>
                </div>

                <div className="grid grid-cols-4 gap-3 w-full h-32 my-2 relative z-10 px-2 justify-items-center items-center">
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-sm transition-all duration-500 ${
                        heroHovered && i % 3 === 0
                          ? "bg-[#ff4a1c] glow-orange-3d scale-125" 
                          : "bg-neutral-800"
                      }`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[7px] font-mono text-neutral-600 relative z-10 border-t border-neutral-900 pt-2">
                  <span>X: 198.243</span>
                  <span>Y: 004.912</span>
                  <span>Z: {heroHovered ? "-030" : "000"}</span>
                </div>
              </div>

              <div 
                className="absolute inset-0 bg-[#121212]/95 border border-neutral-800/80 rounded-xl p-4 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-3d preserve-3d"
                style={{ 
                  transform: `translateZ(${heroHovered ? 70 : 40}px)`,
                  opacity: heroHovered ? 0.95 : 0.85
                }}
              >
              
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible pointer-events-none" viewBox="0 0 100 100" fill="none">
                 
                  <rect x="42" y="42" width="16" height="16" rx="2" fill="#0d0d0d" stroke={heroHovered ? "#ff4a1c" : "#444"} strokeWidth="1" className="transition-colors duration-500" />
                  <circle cx="50" cy="50" r="3" fill="#ff4a1c" className={heroHovered ? "animate-ping" : ""} />
                  
                
                  <path d="M 12,20 L 32,20 L 42,44" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                  <path d="M 12,50 L 42,50" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                  <path d="M 12,80 L 32,80 L 42,56" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                  
                  <path d="M 58,44 L 68,20 L 88,20" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                  <path d="M 58,50 L 88,50" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                  <path d="M 58,56 L 68,80 L 88,80" stroke={heroHovered ? "#ff4a1c" : "#333"} strokeWidth="0.75" strokeDasharray="3 3" className="transition-colors duration-500" />
                </svg>

                <div className="flex justify-between items-center text-[8px] font-mono text-[#ff4a1c] relative z-10">
                  <span>[LATENT_FLOW]</span>
                  <span>{heroHovered ? "COMPILING" : "IDLE"}</span>
                </div>

                <div className="my-auto ml-10 space-y-1 relative z-10 max-w-[120px] pointer-events-none">
                  <div className="h-1 bg-[#ff4a1c]/40 rounded w-4/5" />
                  <div className="h-1 bg-neutral-800 rounded w-11/12" />
                  <div className="h-1 bg-[#ff4a1c] rounded w-1/2" />
                </div>

                <div className="flex justify-between text-[7px] text-neutral-500 font-mono relative z-10">
                  <span>CHECKPOINT_V1.4</span>
                  <span>98.6% ACC</span>
                </div>
              </div>

              
              <div 
                className="absolute inset-0 bg-[#080808] border-2 border-neutral-700/80 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between transition-3d preserve-3d"
                style={{ 
                  transform: `translateZ(${heroHovered ? 170 : 80}px)`,
                  borderColor: heroHovered ? "#ff4a1c" : "#444",
                  boxShadow: heroHovered ? "0 10px 40px rgba(255, 74, 28, 0.25)" : "0 5px 20px rgba(0,0,0,0.8)"
                }}
              >
               
                <div className="absolute inset-0 border border-neutral-900 pointer-events-none z-10" />

                
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-neutral-950">
                  <img 
                    src={image1} 
                    alt="3D Output Preview" 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      heroHovered ? "scale-105 saturate-100 opacity-90" : "scale-100 saturate-50 opacity-60"
                    }`} 
                  />
                  
                
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                
                  <div className="absolute inset-x-0 h-[2px] bg-[#ff4a1c] shadow-[0_0_12px_#ff4a1c] animate-scanline pointer-events-none z-20 opacity-80" />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-10">
                    <div className="w-6 h-[1px] bg-white/60 absolute" />
                    <div className="h-6 w-[1px] bg-white/60 absolute" />
                    <div className="w-10 h-10 border border-white/30 rounded-full absolute" />
                  </div>

                 
                  <div className="absolute top-2 left-2 flex gap-1 items-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c] animate-ping" />
                    <span className="text-[7px] text-white font-mono bg-neutral-900/90 px-1 py-0.5 border border-neutral-800 rounded">RENDER_OK</span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[7px] font-mono text-neutral-400 z-10">
                    <span>[OUTPUT: RETRO_CYBER]</span>
                    <span>1024x1024_PNG</span>
                  </div>
                </div>
              </div>

          
              <div 
                className="absolute -left-10 top-12 bg-neutral-900/95 border border-neutral-800 py-1 px-2.5 rounded shadow-xl text-[8px] font-mono text-green-400 z-50 transition-3d whitespace-nowrap"
                style={{ transform: `translateZ(${heroHovered ? 120 : 50}px)` }}
              >
                <span className="text-neutral-500 mr-1">INPUT:</span> "cybercity"
              </div>

              <div 
                className="absolute -right-10 bottom-20 bg-neutral-900/95 border border-[#ff4a1c]/30 py-1 px-2.5 rounded shadow-xl text-[8px] font-mono text-[#ff4a1c] z-50 transition-3d whitespace-nowrap"
                style={{ transform: `translateZ(${heroHovered ? 200 : 90}px)` }}
              >
                [LATENCY: 0.74s]
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
