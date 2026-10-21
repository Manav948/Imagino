import React from 'react';
import { Search, RefreshCw, X, AlertCircle, Database, Sparkles, Filter } from 'lucide-react';
import HistoryCard from './HistoryCard';

const HistorySection = ({
  historyImages = [],
  loading = false,
  loadingMore = false,
  pagination = {},
  search = '',
  onSearchChange,
  aspectRatioFilter = 'all',
  onAspectRatioFilterChange,
  onRefresh,
  onLoadMore,
  onView,
  onDownload,
  onDelete,
  error = null,
  onRetry,
}) => {
  const totalCount = pagination.totalImages ?? historyImages.length;

  return (
    <div className="space-y-8 mt-16 pt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
            CLOUD_VAULT_SYNCHRONIZED
          </div>
          <h2 className="text-2xl md:text-3xl font-editorial font-normal flex items-center gap-3">
            Persistent <span className="italic text-neutral-400">Creation History</span>
          </h2>
          <p className="text-neutral-400 text-xs mt-1">
            Permanent cloud storage preserved across sessions, devices, and reloads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded">
            [{totalCount} PERSISTED OBJECTS]
          </span>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 rounded border border-neutral-800 bg-[#111111] hover:bg-neutral-900 text-neutral-300 hover:text-white transition active:scale-95"
            title="Refresh History Vault"
            aria-label="Refresh history"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#ff4a1c]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompt keywords..."
            className="w-full bg-[#111111]/80 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff4a1c] transition"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Aspect Ratio Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#ff4a1c]" /> ASPECT:
          </span>
          {['all', '1:1', '16:9', '9:16'].map((ratio) => (
            <button
              key={ratio}
              onClick={() => onAspectRatioFilterChange(ratio)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded border transition ${
                aspectRatioFilter === ratio
                  ? 'bg-[#ff4a1c]/15 border-[#ff4a1c] text-white font-bold'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {ratio.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid or Status Displays */}
      {error && historyImages.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-red-900/30 bg-red-950/10 p-6 flex flex-col items-center justify-center gap-3">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-neutral-300 font-mono">Failed to load history vault.</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 text-xs font-mono font-bold rounded bg-[#ff4a1c] text-white hover:brightness-110 transition active:scale-95"
          >
            Retry Connection
          </button>
        </div>
      ) : loading && historyImages.length === 0 ? (
        /* Skeleton Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#111111]/80 border border-neutral-800 p-3 space-y-3 animate-pulse"
            >
              <div className="w-full aspect-square bg-neutral-900 rounded-lg" />
              <div className="h-3 bg-neutral-900 rounded w-3/4" />
              <div className="h-2 bg-neutral-900 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : historyImages.length === 0 ? (
        /* Empty States */
        <div className="py-20 text-center rounded-xl border border-neutral-800/80 bg-[#111111]/30 p-8 flex flex-col items-center justify-center space-y-3">
          {search ? (
            <>
              <Search className="w-8 h-8 text-neutral-600 mb-1" />
              <p className="text-sm font-mono text-neutral-400">
                No archived creations matched <span className="text-[#ff4a1c]">"{search}"</span>.
              </p>
              <button
                onClick={() => onSearchChange('')}
                className="mt-2 text-xs font-mono text-[#ff4a1c] hover:underline"
              >
                Clear Search Filter
              </button>
            </>
          ) : (
            <>
              <Database className="w-8 h-8 text-neutral-600 mb-1" />
              <p className="text-sm font-editorial text-neutral-300">
                Permanent Vault is Empty
              </p>
              <p className="text-xs font-mono text-neutral-500 max-w-sm">
                Compile prompt tensors above. Every confirmed generation is securely uploaded to Cloudinary and preserved in your history.
              </p>
            </>
          )}
        </div>
      ) : (
        /* Images Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {historyImages.map((img) => (
            <HistoryCard
              key={img._id || img.id}
              image={img}
              onView={onView}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination / Load More Footer */}
      {historyImages.length > 0 && (
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <span>
            Displaying {historyImages.length} of {totalCount} archived creations
          </span>

          {pagination.hasNextPage && (
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="px-6 py-2.5 rounded-lg border border-neutral-800 bg-[#111111] hover:bg-neutral-900 text-neutral-200 hover:text-white font-mono text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow"
            >
              {loadingMore ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#ff4a1c] border-t-transparent rounded-full animate-spin" />
                  <span>Loading older creations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#ff4a1c]" />
                  <span>Load More Creations</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
