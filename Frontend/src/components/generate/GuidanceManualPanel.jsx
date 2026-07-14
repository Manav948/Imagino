import React from "react";
import { BookOpen, Sparkles, Layers } from "lucide-react";

const GuidanceManualPanel = () => {
  return (
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
  );
};

export default GuidanceManualPanel;
