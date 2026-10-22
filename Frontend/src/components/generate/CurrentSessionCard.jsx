import React, { useState } from 'react';
import { Download, RefreshCw, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';

const CurrentSessionCard = ({ item, onView, onDownload, onRetrySave }) => {
  const [detectedAspect, setDetectedAspect] = useState(() => {
    if (item.aspectRatio === '16:9') return '16/9';
    if (item.aspectRatio === '9:16') return '9/16';
    if (item.aspectRatio === '1:1') return '1/1';
    return null;
  });

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      const ratio = naturalWidth / naturalHeight;
      if (ratio >= 1.35) {
        setDetectedAspect('16/9');
      } else if (ratio <= 0.75) {
        setDetectedAspect('9/16');
      } else {
        setDetectedAspect('1/1');
      }
    }
  };

  const activeAspect =
    detectedAspect ||
    (item.aspectRatio === '16:9'
      ? '16/9'
      : item.aspectRatio === '9:16'
      ? '9/16'
      : '1/1');

  const getAspectClass = (ar) => {
    switch (ar) {
      case '16/9':
      case '16:9':
        return 'aspect-video';
      case '9/16':
      case '9:16':
        return 'aspect-[9/16]';
      case '1/1':
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  const isSaving = item.saveStatus === 'saving';
  const isFailed = item.saveStatus === 'failed';
  const isSaved = item.saveStatus === 'saved';

  return (
    <div className="relative rounded-xl bg-[#141414] border border-neutral-800 hover:border-neutral-700 transition overflow-hidden flex flex-col shadow-xl w-full h-auto">
      {/* Top Status Banner */}
      <div className="px-3 py-1.5 border-b border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between text-[10px] font-mono flex-none">
        <span className="text-neutral-400 uppercase tracking-wider">Active Buffer</span>
        <div className="flex items-center gap-1.5">
          {isSaving && (
            <span className="inline-flex items-center gap-1 text-blue-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Syncing to Vault...
            </span>
          )}
          {isSaved && (
            <span className="inline-flex items-center gap-1 text-green-400">
              <CheckCircle2 className="w-3 h-3" />
              Saved in Cloud Vault
            </span>
          )}
          {isFailed && (
            <span className="inline-flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              Vault Save Failed
            </span>
          )}
        </div>
      </div>

      {/* Image Preview Container */}
      <div
        style={{ aspectRatio: activeAspect }}
        className={`relative w-full ${getAspectClass(activeAspect)} bg-neutral-950 overflow-hidden cursor-pointer group`}
        onClick={() => onView(item)}
      >
        <img
          src={item.imageUrl}
          alt={item.prompt}
          onLoad={handleImageLoad}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Hover Quick View */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(item);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20"
            title="Inspect"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(item);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Aspect Ratio Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-black/75 backdrop-blur-md text-white border border-white/10 uppercase">
            {activeAspect === '16/9' ? '16:9' : activeAspect === '9/16' ? '9:16' : '1:1'}
          </span>
        </div>
      </div>

      {/* Details & Actions */}
      <div className="p-3 bg-[#111111] space-y-2 flex-none">
        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed" title={item.prompt}>
          {item.prompt}
        </p>

        {isFailed && (
          <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 flex items-center justify-between gap-2">
            <span className="text-[10px] text-amber-300 font-mono">
              Image generated, but persistence failed.
            </span>
            <button
              onClick={() => onRetrySave(item)}
              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-[10px] inline-flex items-center gap-1 active:scale-95 transition"
            >
              <RefreshCw className="w-3 h-3" /> Retry Save
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-500">
          <span>
            CFG: {item.cfgScale ?? 7.5} • STEPS: {item.steps ?? 30}
          </span>
          <button
            onClick={() => onDownload(item)}
            className="text-neutral-400 hover:text-white inline-flex items-center gap-1 transition"
          >
            <Download className="w-3 h-3" /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentSessionCard;
