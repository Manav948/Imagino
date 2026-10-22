import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import PromptForm from "../components/Input";
import Suggestion from "../components/Suggestion";
import { generateImage, saveImageToHistory, fetchImageHistory, deleteImageFromHistory } from "../lib/imageService";
import { cropImageToBlob, downloadImage } from "../lib/imageUtils";
import { useAuth } from "../context/AuthContext";
import RestrictedAccess from "../components/generate/RestrictedAccess";
import WorkspaceHeader from "../components/generate/WorkspaceHeader";
import GenerationSettings from "../components/generate/GenerationSettings";
import ApiCompilationPanel from "../components/generate/ApiCompilationPanel";
import GuidanceManualPanel from "../components/generate/GuidanceManualPanel";
import CurrentSessionCard from "../components/generate/CurrentSessionCard";
import HistorySection from "../components/generate/HistorySection";
import ImageLightboxModal from "../components/generate/ImageLightboxModal";

const Generate = () => {
  const { user, login } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  // Active generation buffer (current session only)
  const [activeSessionImages, setActiveSessionImages] = useState([]);

  // Persistent image history loaded from MongoDB
  const [historyImages, setHistoryImages] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyLoadingMore, setHistoryLoadingMore] = useState(false);
  const [historyError, setHistoryError] = useState(null);
  const [historyPagination, setHistoryPagination] = useState({
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

  // Generation parameters
  const [cfgScale, setCfgScale] = useState(7.5);
  const [steps, setSteps] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [sampler, setSampler] = useState("Euler a");

  // Keep an active abort controller for search requests
  const abortControllerRef = useRef(null);

  /**
   * Load history from the backend API
   */
  const loadHistory = useCallback(
    async ({ page = 1, searchParam = search, arFilter = aspectRatioFilter, append = false } = {}) => {
      if (!user) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (append) {
        setHistoryLoadingMore(true);
      } else {
        setHistoryLoading(true);
      }
      setHistoryError(null);

      try {
        const response = await fetchImageHistory({
          page,
          limit: 12,
          search: searchParam,
          aspectRatio: arFilter,
          signal: abortControllerRef.current.signal,
        });

        if (response?.data) {
          const { images, pagination } = response.data;
          setHistoryImages((prev) => (append ? [...prev, ...images] : images));
          setHistoryPagination(pagination || {});
        }
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return; // Ignore canceled requests
        }
        console.error("Failed to load history:", err);
        setHistoryError(err.response?.data?.message || "Failed to load history");
      } finally {
        setHistoryLoading(false);
        setHistoryLoadingMore(false);
      }
    },
    [user, search, aspectRatioFilter]
  );

  // Initial load of history on mount
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
   * Handle generating an image and saving it to permanent history
   */
  const handleGenerateImage = async (promptText) => {
    if (!promptText || !promptText.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    const clientGenerationId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setGenerating(true);

    try {
      // 1. Call image generation API
      const res = await generateImage(promptText, {
        cfgScale,
        steps,
        aspectRatio,
        sampler,
      });

      // 2. Crop to aspect ratio via canvas & obtain both base64 preview and binary PNG blob
      const { dataUrl: croppedDataUrl, blob: croppedBlob } = await cropImageToBlob(
        res.resultImage,
        aspectRatio
      );

      // 3. Immediately display in current-session buffer with 'saving' status
      const sessionItem = {
        id: clientGenerationId,
        clientGenerationId,
        imageUrl: croppedDataUrl,
        prompt: promptText,
        aspectRatio,
        cfgScale,
        steps,
        sampler,
        createdAt: new Date().toISOString(),
        saveStatus: "saving",
        blob: croppedBlob,
      };

      setActiveSessionImages((prev) => [sessionItem, ...prev]);

      // Update remaining credit balance
      login({ ...user, imageCount: res.imageCount });
      toast.success("Image generated! Uploading to cloud vault...");

      // 4. Persist to permanent Cloudinary & MongoDB history
      try {
        const savedRes = await saveImageToHistory({
          imageBlob: croppedBlob,
          imageUrl: croppedDataUrl,
          prompt: promptText,
          aspectRatio,
          cfgScale,
          steps,
          sampler,
          clientGenerationId,
        });

        const savedRecord = savedRes.data?.image;

        if (savedRecord) {
          // Update active session card status to 'saved'
          setActiveSessionImages((prev) =>
            prev.map((item) =>
              item.clientGenerationId === clientGenerationId
                ? { ...item, ...savedRecord, saveStatus: "saved" }
                : item
            )
          );

          // Add to permanent history immediately (avoiding duplicates)
          setHistoryImages((prev) => {
            if (prev.some((p) => p._id === savedRecord._id || p.clientGenerationId === clientGenerationId)) {
              return prev;
            }
            return [savedRecord, ...prev];
          });

          setHistoryPagination((prev) => ({
            ...prev,
            totalImages: (prev.totalImages || 0) + 1,
          }));

          toast.success("Image successfully saved to permanent history!");
        }
      } catch (persistErr) {
        console.error("Save to history failed:", persistErr);
        setActiveSessionImages((prev) =>
          prev.map((item) =>
            item.clientGenerationId === clientGenerationId
              ? { ...item, saveStatus: "failed" }
              : item
          )
        );
        toast.error("Generation succeeded, but saving to permanent history failed. You can retry save.");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error(error.response?.data?.message || "Failed to generate image.");
    } finally {
      setGenerating(false);
    }
  };

  /**
   * Retry saving a session image whose persistence failed
   */
  const handleRetrySave = async (sessionItem) => {
    setActiveSessionImages((prev) =>
      prev.map((item) =>
        item.clientGenerationId === sessionItem.clientGenerationId
          ? { ...item, saveStatus: "saving" }
          : item
      )
    );

    try {
      const savedRes = await saveImageToHistory({
        imageBlob: sessionItem.blob,
        imageUrl: sessionItem.imageUrl,
        prompt: sessionItem.prompt,
        aspectRatio: sessionItem.aspectRatio,
        cfgScale: sessionItem.cfgScale,
        steps: sessionItem.steps,
        sampler: sessionItem.sampler,
        clientGenerationId: sessionItem.clientGenerationId,
      });

      const savedRecord = savedRes.data?.image;
      if (savedRecord) {
        setActiveSessionImages((prev) =>
          prev.map((item) =>
            item.clientGenerationId === sessionItem.clientGenerationId
              ? { ...item, ...savedRecord, saveStatus: "saved" }
              : item
          )
        );

        setHistoryImages((prev) => {
          if (prev.some((p) => p._id === savedRecord._id)) return prev;
          return [savedRecord, ...prev];
        });

        setHistoryPagination((prev) => ({
          ...prev,
          totalImages: (prev.totalImages || 0) + 1,
        }));

        toast.success("Image successfully archived in your vault!");
      }
    } catch (err) {
      console.error("Retry save failed:", err);
      setActiveSessionImages((prev) =>
        prev.map((item) =>
          item.clientGenerationId === sessionItem.clientGenerationId
            ? { ...item, saveStatus: "failed" }
            : item
        )
      );
      toast.error("Retry failed. Please check network and try again.");
    }
  };

  /**
   * Delete an image from history
   */
  const handleDeleteImage = async (image) => {
    const imageId = image._id || image.id;
    await deleteImageFromHistory(imageId);

    // Remove from history state
    setHistoryImages((prev) => prev.filter((img) => (img._id || img.id) !== imageId));

    // Also update active session card if present
    setActiveSessionImages((prev) =>
      prev.filter((item) => (item._id || item.id) !== imageId)
    );

    setHistoryPagination((prev) => ({
      ...prev,
      totalImages: Math.max(0, (prev.totalImages || 1) - 1),
    }));

    toast.success("Image deleted from permanent history");
  };

  /**
   * Download image helper
   */
  const handleDownload = async (image) => {
    const success = await downloadImage(image.imageUrl, image.prompt);
    if (success) {
      toast.success("Download started!");
    }
  };

  /**
   * Load more pages of history
   */
  const handleLoadMore = () => {
    if (historyPagination.hasNextPage && !historyLoadingMore) {
      const nextPage = (historyPagination.page || 1) + 1;
      loadHistory({ page: nextPage, append: true });
    }
  };

  if (!user) {
    return <RestrictedAccess />;
  }

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
        <WorkspaceHeader user={user} />

        {/* Generator Form and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#111111]/40 border border-neutral-800 rounded-xl p-6 shadow-md">
              <PromptForm
                onSubmit={handleGenerateImage}
                prompt={prompt}
                setPrompt={setPrompt}
                loading={generating}
              />
              <div className="text-center text-[10px] text-neutral-500 font-mono mt-4">
                🔒 Production Persistent Cloudinary Storage Enabled. Images are permanently archived.
              </div>
            </div>

            <div className="bg-[#111111]/40 border border-neutral-800 rounded-xl p-4 shadow-md overflow-hidden">
              <Suggestion setPrompt={setPrompt} />
            </div>
          </div>

          <GenerationSettings
            cfgScale={cfgScale}
            setCfgScale={setCfgScale}
            steps={steps}
            setSteps={setSteps}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            sampler={sampler}
            setSampler={setSampler}
          />
        </div>

        {/* Divider */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        {/* SECTION 1: Active Generation Buffer (Current Session) */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-neutral-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-400 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                SESSION_BUFFER
              </div>
              <h2 className="text-xl font-editorial font-normal">
                Active Session <span className="italic text-neutral-400">Creations</span>
              </h2>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              [{activeSessionImages.length} RECENT]
            </span>
          </div>

          {activeSessionImages.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-600 border border-neutral-900 rounded-xl bg-[#0e0e0e]/50">
              NO_SESSION_OBJECTS_COMPILED. ENTER PROMPT ABOVE TO EXECUTE.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
              {activeSessionImages.map((item) => (
                <CurrentSessionCard
                  key={item.clientGenerationId || item.id}
                  item={item}
                  onView={setSelectedImage}
                  onDownload={handleDownload}
                  onRetrySave={handleRetrySave}
                />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        {/* SECTION 2: Permanent History Vault */}
        <HistorySection
          historyImages={historyImages}
          loading={historyLoading}
          loadingMore={historyLoadingMore}
          pagination={historyPagination}
          search={search}
          onSearchChange={setSearch}
          aspectRatioFilter={aspectRatioFilter}
          onAspectRatioFilterChange={setAspectRatioFilter}
          onRefresh={() => loadHistory({ page: 1 })}
          onLoadMore={handleLoadMore}
          onView={setSelectedImage}
          onDownload={handleDownload}
          onDelete={handleDeleteImage}
          error={historyError}
          onRetry={() => loadHistory({ page: 1 })}
        />

        {/* Divider */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        <ApiCompilationPanel
          user={user}
          prompt={prompt}
          cfgScale={cfgScale}
          sampler={sampler}
          steps={steps}
        />

        {/* Divider */}
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        <GuidanceManualPanel />
      </div>

      {/* Lightbox / Modal for Inspection */}
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

export default Generate;
