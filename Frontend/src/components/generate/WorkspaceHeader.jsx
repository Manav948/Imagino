import React from "react";

const WorkspaceHeader = ({ user }) => {
  return (
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
          CREDIT_BALANCE: <span className="text-[#ff4a1c] font-bold">{user?.imageCount ?? 0}</span>
        </span>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
