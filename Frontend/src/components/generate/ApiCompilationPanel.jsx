import React from "react";
import { Terminal } from "lucide-react";

const ApiCompilationPanel = ({ user, prompt, cfgScale, sampler, steps }) => {
  return (
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
  -H "Authorization: Bearer ${user?._id || user?.userId || 'YOUR_API_TOKEN'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "${prompt || 'cyberpunk neon city'}",
    "cfg_scale": ${cfgScale},
    "sampler": "${sampler}",
    "steps": ${steps}
  }'`}
        </pre>
      </div>
    </div>
  );
};

export default ApiCompilationPanel;
