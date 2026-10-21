import React, { useState } from 'react';
import { Eye, Download, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { getOptimizedImageUrl, formatRelativeTime } from '../../lib/imageUtils';

const HistoryCard = ({ image, onView, onDownload, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const thumbnailUrl = getOptimizedImageUrl(image.imageUrl, { width: 500 });

  const getAspectClass = (ar) => {
    switch (ar) {
      case '16:9':
        return 'aspect-video';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    if (deleting) return;
    setDeleting(true);
    try {
      await onDelete(image);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group relative rounded-xl bg-[#111111]/80 border border-neutral-800/80 hover:border-[#ff4a1c]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-[0_4px_24px_rgba(255,74,28,0.12)]">
      {/* Aspect Ratio Image Container */}
      <div
        className={`relative w-full ${getAspectClass(image.aspectRatio)} bg-neutral-900/90 overflow-hidden cursor-pointer`}
        onClick={() => onView(image)}
      >
        {/* Skeleton Shimmer while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-neutral-700 border-t-[#ff4a1c] rounded-full animate-spin" />
          </div>
        )}

        {/* Failed image state */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-4 text-center">
            <AlertCircle className="w-8 h-8 text-neutral-600 mb-2" />
            <span className="text-[11px] font-mono text-neutral-500">Asset Load Error</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImageError(false);
                setImageLoaded(false);
                setRetryKey((prev) => prev + 1);
              }}
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[#ff4a1c] hover:underline"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        ) : (
          <img
            key={retryKey}
            src={thumbnailUrl}
            alt={image.prompt || 'Generated art'}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10 uppercase">
            {image.aspectRatio || '1:1'}
          </span>
          {image.sampler && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-mono bg-black/60 backdrop-blur-md text-neutral-400 border border-white/5">
              {image.sampler}
            </span>
          )}
        </div>

        {/* Timestamp Badge */}
        <div className="absolute top-2 right-2 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-black/70 backdrop-blur-md text-neutral-400 border border-white/10">
            {formatRelativeTime(image.createdAt)}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(image);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-[#ff4a1c] text-white text-xs font-mono flex items-center gap-1.5 border border-neutral-700 transition-colors shadow"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(image);
              }}
              className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 transition-colors shadow"
              title="Download Original"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={deleting}
              className="p-1.5 rounded-lg bg-neutral-900/90 hover:bg-red-600/90 text-neutral-400 hover:text-white border border-neutral-700 transition-colors shadow"
              title="Delete from Vault"
            >
              {deleting ? (
                <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3 border-t border-neutral-800/80 bg-[#0d0d0d]/90 flex flex-col gap-1.5">
        <p
          className="text-xs text-neutral-300 line-clamp-2 leading-relaxed font-sans"
          title={image.prompt}
        >
          {image.prompt}
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
          <span>
            CFG: <span className="text-neutral-400">{image.cfgScale ?? 7.5}</span> • STEPS:{' '}
            <span className="text-neutral-400">{image.steps ?? 30}</span>
          </span>
          <span className="text-[9px] text-neutral-600">
            ID: {(image._id || image.id || '').slice(-4).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
