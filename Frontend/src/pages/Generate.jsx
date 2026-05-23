import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PromptForm from "../components/Input";
import Suggestion from "../components/Suggestion";
import ImageCard from "../components/ImageCard";
import { generateImage } from "../lib/imageService";
import { useAuth } from "../context/AuthContext";
import defaultImage from "../images/image24.webp";

// Lucide icons for high-fidelity UI
import { Sliders, Code, BookOpen, Layers, Terminal, Sparkles } from "lucide-react";

// Crop helper to center crop 1024x1024 base64 output dynamically to 16:9 or 9:16 aspect ratio
const cropImageToAspectRatio = (base64Str, aspectRatio) => {
  return new Promise((resolve) => {
    if (aspectRatio === "1:1") {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = img.width;
      const height = img.height;
      let targetWidth = width;
      let targetHeight = height;

      if (aspectRatio === "16:9") {
        targetHeight = width * (9 / 16);
      } else if (aspectRatio === "9:16") {
        targetWidth = height * (9 / 16);
      } else {
        resolve(base64Str);
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Center crop
      const sx = (width - targetWidth) / 2;
      const sy = (height - targetHeight) / 2;

      ctx.drawImage(
        img,
        sx, sy, targetWidth, targetHeight, // Source coords
        0, 0, targetWidth, targetHeight   // Dest coords
      );

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

const Generate = () => {
  const { user, login } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([
    {
      imageUrl: defaultImage,
      prompt: "Neon cybercity alleyway with high reflection puddles",
      createdBy: "Admin",
    },
  ]);

  // Mock settings for generation parameters dashboard
  const [cfgScale, setCfgScale] = useState(7.5);
  const [steps, setSteps] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [sampler, setSampler] = useState("Euler a");

  const handleGenerateImage = async (promptText) => {
    if (!promptText) {
      toast.error("Please enter a prompt.");
      return;
    }
    if (!user?._id) {
      toast.error("Please log in to generate images.");
      return;
    }
    try {
      setLoading(true);
      const res = await generateImage(promptText, user._id, {
        cfgScale,
        steps,
        aspectRatio,
        sampler,
      });

      // Crop the returned base64 image to the correct aspect ratio
      const croppedImage = await cropImageToAspectRatio(res.resultImage, aspectRatio);

      const newImage = {
        imageUrl: croppedImage,
        prompt: promptText,
        createdBy: user.username || "You",
      };
      setGeneratedImages((prev) => [newImage, ...prev]);
      login({ ...user, imageCount: res.imageCount });
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate image.");
      console.error("Image generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToSlider = (imageUrl) => {
    toast.success("Successfully added to trending showcase list!");
  };

  // Lock view for unauthenticated users (styled in tech blueprint)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">

        {/* Border Rulers */}
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
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">

      {/* LEFT RULER BORDER */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span><span>250</span><span>300</span><span>350</span><span>400</span><span>450</span><span>500</span><span>550</span><span>600</span><span>650</span><span>700</span><span>750</span><span>800</span>
        </div>
      </div>

      {/* RIGHT RULER BORDER */}
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span><span>250</span><span>300</span><span>350</span><span>400</span><span>450</span><span>500</span><span>550</span><span>600</span><span>650</span><span>700</span><span>750</span><span>800</span>
        </div>
      </div>

      {/* TOP HEADER DIVIDER */}
      <div className="w-full h-[1px] bg-neutral-800/80 relative mb-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24 z-10 relative">

        {/* Workspace Title & Stats Banner */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-neutral-800/80 pb-6 mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
              PLAYGROUND_CLUSTER_ACTIVE
            </div>
            <h1 className="text-3xl font-editorial font-normal">
              AI Generation <span className="italic text-neutral-400">Workspace</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-[#111111] border border-neutral-800 px-4 py-2 rounded">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-mono text-neutral-400">
              CREDIT_BALANCE: <span className="text-[#ff4a1c] font-bold">{user.imageCount}</span>
            </span>
          </div>
        </div>

        {/* WORKSPACE GRID: Prompt Workspace + Settings Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Area: Inputs & Suggestions (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#111111]/40 border border-neutral-800 rounded-xl p-6 shadow-md">
              <PromptForm onSubmit={handleGenerateImage} prompt={prompt} setPrompt={setPrompt} />

              <div className="text-center text-[10px] text-neutral-500 font-mono mt-4">
                ⚠️ Session-only buffer storage. Please download generated images to prevent loss.
              </div>
            </div>

            {/* Suggestions list */}
            <div className="bg-[#111111]/40 border border-neutral-800 rounded-xl p-4 shadow-md overflow-hidden">
              <Suggestion setPrompt={setPrompt} />
            </div>
          </div>

          {/* Right Area: Generation Parameters Dashboard (4 columns) */}
          <div className="lg:col-span-4 bg-[#111111]/60 border border-neutral-800 rounded-xl p-6 shadow-lg space-y-6">

            <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
              <Sliders className="w-4 h-4 text-[#ff4a1c]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 font-mono">
                Parameters
              </h3>
            </div>

            {/* Slider 1: CFG Scale */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>CFG_SCALE</span>
                <span className="text-white font-bold">{cfgScale}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={cfgScale}
                onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                className="w-full accent-[#ff4a1c] bg-neutral-800 rounded-lg appearance-none h-1"
              />
              <p className="text-[9px] text-neutral-500">Steers prompt alignment weighting.</p>
            </div>

            {/* Slider 2: Inference Steps */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>SAMPLING_STEPS</span>
                <span className="text-white font-bold">{steps}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={steps}
                onChange={(e) => setSteps(parseInt(e.target.value))}
                className="w-full accent-[#ff4a1c] bg-neutral-800 rounded-lg appearance-none h-1"
              />
              <p className="text-[9px] text-neutral-500">Denoising iterations (higher = slower).</p>
            </div>

            {/* Select 1: Aspect Ratio */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-400">ASPECT_RATIO</label>
              <div className="grid grid-cols-3 gap-2">
                {["1:1", "16:9", "9:16"].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1.5 text-xs font-mono border rounded transition ${aspectRatio === ratio
                        ? "bg-[#ff4a1c]/10 border-[#ff4a1c] text-white"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white"
                      }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Select 2: Sampler */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-400">SAMPLING_METHOD</label>
              <select
                value={sampler}
                onChange={(e) => setSampler(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#ff4a1c]"
              >
                <option value="Euler a">Euler a (Adaptive)</option>
                <option value="DPM++ 2M SDE">DPM++ 2M SDE (Karras)</option>
                <option value="DDIM">DDIM (Classic)</option>
                <option value="Heun">Heun (Double Step)</option>
              </select>
            </div>

          </div>

        </div>

        {/* SECTION DIVIDER */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        {/* GENERATE QUEUE / HISTORY SECTION */}
        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-neutral-800/80 pb-4">
            <h2 className="text-xl font-editorial font-normal">
              Compiled <span className="italic text-neutral-400">Creations Buffer</span>
            </h2>
            <span className="text-[10px] font-mono text-neutral-500">[{generatedImages.length} OBJECTS]</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-6 w-full">
            {generatedImages.length === 0 ? (
              <div className="py-20 text-center text-xs font-mono text-neutral-600">
                NO_OBJECTS_COMPILED. ENTER PROMPT TO EXECUTE.
              </div>
            ) : (
              generatedImages.map((img, index) => (
                <ImageCard
                  key={index}
                  imageUrl={img.imageUrl}
                  prompt={img.prompt}
                  createdBy={img.createdBy}
                  onAddToSlider={handleAddToSlider}
                />
              ))
            )}
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        {/* EXPANDED SECTION A: API COMPILATION PROTOCOL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-[#ff4a1c]" />
              API_COMPILATION
            </div>
            <h3 className="text-xl font-editorial font-normal">
              Programmatic <span className="italic text-neutral-400">Integrations</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Synthesize images directly from command terminals or scripts. Obtain API credentials from your Profile settings and execute cURL headers.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#111111] border border-neutral-800 rounded-lg p-5 shadow-inner">
            <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 pb-3 border-b border-neutral-800/80 mb-3">
              <span>CURL_REQUEST_SHELL</span>
              <span>BASH</span>
            </div>
            <pre className="text-[10px] font-mono text-neutral-300 overflow-x-auto whitespace-pre leading-relaxed p-2 rounded bg-black/40">
              {`curl -X POST "https://api.imagino.ai/v1/generate" \\
  -H "Authorization: Bearer ${user?._id || 'YOUR_API_TOKEN'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "${prompt || 'cyberpunk neon city'}",
    "cfg_scale": ${cfgScale},
    "sampler": "${sampler}",
    "steps": ${steps}
  }'`}
            </pre>
          </div>z

        </div>

        {/* SECTION DIVIDER */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        {/* EXPANDED SECTION B: PROMPT COMPILING INSTRUCTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500">
              <BookOpen className="w-3.5 h-3.5 text-[#ff4a1c]" />
              GUIDE_MANUAL
            </div>
            <h3 className="text-xl font-editorial font-normal">
              Latent Guidance <span className="italic text-neutral-400">Optimization</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Use semantic tokens to steer textures, lighting vectors, and geometry arrays inside diffusion solvers.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-[#111111]/40 border border-neutral-800 rounded-lg p-5 space-y-2">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ff4a1c]" /> LIGHTING_WEIGHTS
              </h4>
              <p className="text-[11px] text-neutral-400">
                Incorporate volumetric terms (e.g. <code>"volumetric rays"</code>, <code>"global illumination"</code>, <code>"rim lighting"</code>) to increase visual contrast and shadow depth.
              </p>
            </div>

            <div className="bg-[#111111]/40 border border-neutral-800 rounded-lg p-5 space-y-2">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#ff4a1c]" /> RENDER_COMPILERS
              </h4>
              <p className="text-[11px] text-neutral-400">
                Steer fidelity by declaring style tokens (e.g. <code>"analog film grain"</code>, <code>"octane render"</code>, <code>"matte digital painting"</code>) at the tail end of your input.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Generate;
