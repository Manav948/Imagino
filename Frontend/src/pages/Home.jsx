import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HoverExpand from "../components/ui/hover-expand";
import Gallery from "../components/Gallery";
import UserRating from "../components/UserRating";
import aboutImage from "../images/image3.png";

import { Sparkles, Cpu, Layers, Zap, ArrowRight, Github, Twitter, Lightbulb, Grid, Linkedin } from "lucide-react";

import image1 from "../images/image4.png";
import image2 from "../images/image5.png";
import image3 from "../images/image6.png";
import image4 from "../images/image16.webp";
import image5 from "../images/image17.webp";
import image6 from "../images/image23.webp";
import image7 from "../images/image12.jpg";
import image8 from "../images/image13.jpg";
import image25 from "../images/image25.webp";
import image26 from "../images/image26.webp";
import image27 from "../images/image27.jpg";

gsap.registerPlugin(ScrollTrigger);

const initialSliderImages = [image1, image2, image3, image4, image5, image6, image7, image8, image25, image26, image27];

const Home = () => {
  const { user } = useAuth();
  const [sliderImages] = useState([...initialSliderImages]);
  const [heroHovered, setHeroHovered] = useState(false);

  
  useEffect(() => {
   
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    
    gsap.utils.toArray(".fade-up").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const userName = user?.name || user?.email?.split('@')[0] || user?.username || 'Creator';

  return (
    <div className="text-white bg-[#0b0b0b] min-h-screen relative overflow-hidden font-sans-modern pt-20">
      
   
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span>
          <span>050</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>250</span>
          <span>300</span>
          <span>350</span>
          <span>400</span>
          <span>450</span>
          <span>500</span>
          <span>550</span>
          <span>600</span>
          <span>650</span>
          <span>700</span>
          <span>750</span>
          <span>800</span>
        </div>
      </div>

     
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span>
          <span>050</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>250</span>
          <span>300</span>
          <span>350</span>
          <span>400</span>
          <span>450</span>
          <span>500</span>
          <span>550</span>
          <span>600</span>
          <span>650</span>
          <span>700</span>
          <span>750</span>
          <span>800</span>
        </div>
      </div>

    
      <div className="w-full h-[1px] bg-neutral-800/80 relative">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

    
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

     
      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

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
                <span className="text-[9px] font-mono  bg-[#ff4a1c]/10 border border-[#ff4a1c]/25 text-[#ff4a1c] py-0.5 px-2 rounded animate-pulse">"Realistic"</span>
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

      
      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      
      <section className="py-16 fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-[#111111] text-xs text-neutral-400 font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
            Masterpiece Slider
          </div>
          <h3 className="text-3xl md:text-5xl font-editorial font-normal mb-4">
            Deep Dive Into Our <span className="italic text-neutral-400">AI Creations</span>
          </h3>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
            Hover to expand and investigate stunning details of images compiled by community users.
          </p>
        </div>
        <div>
          <HoverExpand
            images={sliderImages}
            initialSelectedIndex={0}
            thumbnailHeight={200}
            modalImageSize={400}
            maxThumbnails={11}
          />
        </div>
      </section>

     
      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

    
      <section className="fade-up">
        <Gallery />
      </section>

     
      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

  
      <section className="px-6 md:px-24 py-12 max-w-7xl mx-auto z-10 fade-up">
        <div className="relative rounded-2xl bg-[#111111]/60 border border-neutral-800 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="relative z-10 w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-editorial font-normal mb-5 leading-tight">
              Unlock Creativity with <span className="italic text-neutral-400">Smarter Prompts</span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Discover the power of <span className="text-white font-semibold">Promptify.AI</span> — your creative co-pilot for crafting detailed and inspiring prompts.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Effortlessly combine concepts, styles, moods, and lighting to bring your imagination to life. Compile tags step-by-step and steer our neural weights precisely.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-1/2 flex justify-center">
            <img
              src={aboutImage}
              alt="About Promptify.AI"
              className="rounded border border-neutral-800 shadow-2xl w-full max-w-xs object-cover filter contrast-110 saturate-75"
            />
          </div>
        </div>
      </section>

    
      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

    
      <section className="fade-up">
        <UserRating />
      </section>

   
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

    </div>
  );
};

export default Home;