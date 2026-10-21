import React, { useEffect, useState } from 'react';
import { X, Download, Trash2, Copy, Check, Calendar, Sliders, Hash, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageLightboxModal = ({ image, onClose, onDownload, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (confirmDelete) {
          setConfirmDelete(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [confirmDelete, onClose]);

  if (!image) return null;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(image.prompt);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy prompt');
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(image);
      onClose();
    } catch {
      toast.error('Deletion failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Full Image Display */}
        <div className="w-full md:w-3/5 bg-black/95 flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px] relative overflow-hidden">
          <img
            src={image.imageUrl}
            alt={image.prompt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto space-y-6 border-t md:border-t-0 md:border-l border-neutral-800">
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#ff4a1c] uppercase tracking-wider font-bold">
                ASSET_SPECIFICATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400">
                {image.aspectRatio || '1:1'}
              </span>
            </div>

            {/* Prompt details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>SYNTHESIS_PROMPT</span>
                <button
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1 text-[11px] text-[#ff4a1c] hover:underline"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-200 leading-relaxed max-h-36 overflow-y-auto">
                {image.prompt}
              </div>
            </div>

            {/* Generation Parameters */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-neutral-400 block">PARAMETERS</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-500 block text-[9px]">CFG_SCALE</span>
                  <span className="text-white font-bold">{image.cfgScale ?? 7.5}</span>
                </div>
                <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-500 block text-[9px]">STEPS</span>
                  <span className="text-white font-bold">{image.steps ?? 30}</span>
                </div>
                <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-500 block text-[9px]">SAMPLER</span>
                  <span className="text-neutral-200 truncate block">{image.sampler || 'Euler a'}</span>
                </div>
                <div className="p-2.5 rounded bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-500 block text-[9px]">ASPECT</span>
                  <span className="text-neutral-200">{image.aspectRatio || '1:1'}</span>
                </div>
              </div>
            </div>

            {/* Timestamp & Metadata */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(image.createdAt || Date.now()).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {(image._id || image.id || '').slice(-8)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            {confirmDelete ? (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 space-y-2.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Confirm deletion from cloud vault?</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-1.5 px-3 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    {deleting ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Yes, Delete'
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                    className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => onDownload(image)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#ff4a1c] hover:brightness-110 active:scale-95 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-[#ff4a1c]/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res</span>
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-800/80 transition"
                  title="Delete from Vault"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightboxModal;
