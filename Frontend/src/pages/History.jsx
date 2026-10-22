import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Sparkles, RefreshCw, Search, X, Filter, Database, AlertCircle, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchImageHistory, deleteImageFromHistory } from "../lib/imageService";
import { downloadImage } from "../lib/imageUtils";
import RestrictedAccess from "../components/generate/RestrictedAccess";
import HistoryCard from "../components/generate/HistoryCard";
import ImageLightboxModal from "../components/generate/ImageLightboxModal";

const History = () => {
  const { user } = useAuth();

  const [historyImages, setHistoryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalImages: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filters & Search
  const [search, setSearch] = useState("");
  const [aspectRatioFilter, setAspectRatioFilter] = useState("all");

  // Lightbox Modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Active abort controller for in-flight search requests
  const abortControllerRef = useRef(null);

  /**
   * Load history from backend
   */
  const loadHistory = useCallback(
    async ({ page = 1, searchParam = search, arFilter = aspectRatioFilter, append = false } = {}) => {
      if (!user) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await fetchImageHistory({
          page,
          limit: 12,
          search: searchParam,
          aspectRatio: arFilter,
          signal: abortControllerRef.current.signal,
        });

        if (response?.data) {
          const { images, pagination: pg } = response.data;
          setHistoryImages((prev) => (append ? [...prev, ...images] : images));
          setPagination(pg || {});
        }
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return;
        }
        console.error("Failed to load history:", err);
        setError(err.response?.data?.message || "Failed to load history archive.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [user, search, aspectRatioFilter]
  );

  // Initial load
  useEffect(() => {
    if (user) {
      loadHistory({ page: 1 });
    }
  }, [user, loadHistory]);

  // Debounced search and filter effect
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      loadHistory({ page: 1, searchParam: search, arFilter: aspectRatioFilter, append: false });
    }, 350);

    return () => clearTimeout(timer);
  }, [search, aspectRatioFilter, user, loadHistory]);

  /**
   * Delete an image from history
   */
  const handleDeleteImage = async (image) => {
    const imageId = image._id || image.id;
    try {
      await deleteImageFromHistory(imageId);
      setHistoryImages((prev) => prev.filter((img) => (img._id || img.id) !== imageId));
      setPagination((prev) => ({
        ...prev,
        totalImages: Math.max(0, (prev.totalImages || 1) - 1),
      }));
      toast.success("Image deleted from permanent history");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.response?.data?.message || "Failed to delete image");
    }
  };

  /**
   * Download original image
   */
  const handleDownload = async (image) => {
    const success = await downloadImage(image.imageUrl, image.prompt);
    if (success) {
      toast.success("Download started!");
    }
  };

  /**
   * Load more pagination
   */
  const handleLoadMore = () => {
    if (pagination.hasNextPage && !loadingMore) {
      const nextPage = (pagination.page || 1) + 1;
      loadHistory({ page: nextPage, append: true });
    }
  };

  if (!user) {
    return <RestrictedAccess />;
  }

  const totalCount = pagination.totalImages ?? historyImages.length;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">
      {/* Blueprint Grid Lines */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span><span>250</span><span>300</span><span>350</span><span>400</span><span>450</span><span>500</span><span>550</span><span>600</span><span>650</span><span>700</span><span>750</span><span>800</span>
        </div>
      </div>

      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span><span>050</span><span>100</span><span>150</span><span>200</span><span>250</span><span>300</span><span>350</span><span>400</span><span>450</span><span>500</span><span>550</span><span>600</span><span>650</span><span>700</span><span>750</span><span>800</span>
        </div>
      </div>

      {/* Top Section Line */}
      <div className="w-full h-[1px] bg-neutral-800/80 relative mb-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24 z-10 relative">
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-neutral-800/80 pb-6 mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
              PERMANENT_CLOUD_VAULT
            </div>
            <h1 className="text-3xl md:text-4xl font-editorial font-normal">
              Image Generation <span className="italic text-neutral-400">History</span>
            </h1>
            <p className="text-neutral-400 text-xs mt-1 max-w-lg leading-relaxed">
              Every creation you synthesize is permanently archived here in Cloudinary. Inspect parameters, download high-resolution assets, or delete records anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#111111] border border-neutral-800 px-4 py-2 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-mono text-neutral-400">
                TOTAL_SAVED: <span className="text-white font-bold">{totalCount}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#111111] border border-neutral-800 px-4 py-2 rounded">
              <Zap className="w-3.5 h-3.5 text-[#ff4a1c]" />
              <span className="text-xs font-mono text-neutral-400">
                CREDITS_USED: <span className="text-[#ff4a1c] font-bold">{user?.imageCount ?? 0}</span>
              </span>
            </div>

            <Link to="/generate">
              <button className="px-4 py-2 rounded bg-[#ff4a1c] hover:brightness-110 active:scale-95 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-[0_4px_12px_rgba(255,74,28,0.25)]">
                <span>Playground</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-[#111111]/50 border border-neutral-800 rounded-xl p-4 md:p-5 mb-8 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Prompt Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompt keywords (e.g. cyber, neon, snowy)..."
                className="w-full bg-black/60 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff4a1c] transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Aspect Ratio Filter & Refresh */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <div className="flex items-center gap-1 bg-black/60 p-1 border border-neutral-800 rounded-lg">
                <span className="text-[10px] font-mono text-neutral-500 px-2 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#ff4a1c]" /> ASPECT:
                </span>
                {["all", "1:1", "16:9", "9:16"].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatioFilter(ratio)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded transition ${
                      aspectRatioFilter === ratio
                        ? "bg-[#ff4a1c] text-white font-bold shadow"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {ratio.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => loadHistory({ page: 1 })}
                disabled={loading}
                className="p-2 rounded-lg border border-neutral-800 bg-black/60 hover:bg-neutral-900 text-neutral-300 hover:text-white transition active:scale-95"
                title="Refresh Vault"
                aria-label="Refresh history"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#ff4a1c]" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid or State Views */}
        {error && historyImages.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-red-900/40 bg-red-950/15 p-8 flex flex-col items-center justify-center gap-3">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <h3 className="text-base font-mono text-neutral-200">Unable to load history archive</h3>
            <p className="text-xs font-mono text-neutral-400">{error}</p>
            <button
              onClick={() => loadHistory({ page: 1 })}
              className="mt-2 px-5 py-2 text-xs font-mono font-bold rounded-lg bg-[#ff4a1c] text-white hover:brightness-110 active:scale-95 transition"
            >
              Retry Connection
            </button>
          </div>
        ) : loading && historyImages.length === 0 ? (
          /* Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
          <div className="py-24 text-center rounded-2xl border border-neutral-800/80 bg-[#111111]/30 p-8 flex flex-col items-center justify-center space-y-4">
            {search ? (
              <>
                <Search className="w-10 h-10 text-neutral-600 mb-1" />
                <h3 className="text-lg font-editorial text-neutral-300">No Matching Creations</h3>
                <p className="text-xs font-mono text-neutral-400">
                  No images matched your query <span className="text-[#ff4a1c]">"{search}"</span>.
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-2 text-xs font-mono text-[#ff4a1c] hover:underline"
                >
                  Clear Search Filter
                </button>
              </>
            ) : (
              <>
                <Database className="w-12 h-12 text-neutral-600 mb-1" />
                <h3 className="text-xl font-editorial text-neutral-200">
                  Your History Vault is Empty
                </h3>
                <p className="text-xs font-mono text-neutral-500 max-w-md leading-relaxed">
                  You haven't generated any images yet. Head over to the Playground to craft your first prompt and start building your collection.
                </p>
                <Link to="/generate">
                  <button className="mt-4 px-6 py-2.5 rounded-xl bg-[#ff4a1c] hover:brightness-110 active:scale-95 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-[0_4px_16px_rgba(255,74,28,0.3)]">
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Playground</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        ) : (
          /* Grid of History Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {historyImages.map((img) => (
              <HistoryCard
                key={img._id || img.id}
                image={img}
                onView={setSelectedImage}
                onDownload={handleDownload}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        )}

        {/* Pagination & Load More */}
        {historyImages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <span>
              Showing {historyImages.length} of {totalCount} archived creations
            </span>

            {pagination.hasNextPage ? (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2.5 rounded-lg border border-neutral-800 bg-[#111111] hover:bg-neutral-900 text-neutral-200 hover:text-white font-mono text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow"
              >
                {loadingMore ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#ff4a1c] border-t-transparent rounded-full animate-spin" />
                    <span>Loading more creations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#ff4a1c]" />
                    <span>Load More Creations</span>
                  </>
                )}
              </button>
            ) : (
              <span className="text-[11px] text-neutral-600 font-mono">
                ✓ All archived creations loaded
              </span>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <ImageLightboxModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={handleDownload}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
};

export default History;
