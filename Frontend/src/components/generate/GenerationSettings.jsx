import React from "react";
import { Sliders } from "lucide-react";

const GenerationSettings = ({
  cfgScale,
  setCfgScale,
  steps,
  setSteps,
  aspectRatio,
  setAspectRatio,
  sampler,
  setSampler,
}) => {
  return (
    <div className="lg:col-span-4 bg-[#111111]/60 border border-neutral-800 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
        <Sliders className="w-4 h-4 text-[#ff4a1c]" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 font-mono">
          Parameters
        </h3>
      </div>

   
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
  );
};

export default GenerationSettings;
