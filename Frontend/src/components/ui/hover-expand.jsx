import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function HoverExpand({
  images,
  initialSelectedIndex = 0,
  thumbnailHeight = 200,
  modalImageSize = 400,
  maxThumbnails = 11
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("overflow-hidden")
    };
  }, [isModalOpen])

  return (
    <div className="relative w-full overflow-hidden px-4 md:px-12 flex justify-center">
      <div className="flex w-full max-w-4xl gap-2 py-8 justify-center">
        {images.slice(0, maxThumbnails).map((imageUrl, i) => (
          <div
            key={`image-container-${i}`}
            className={`relative h-48 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-lg hover:shadow-2xl border border-neutral-900 ${
              selectedIndex === i ? "w-48 sm:w-60 md:w-72" : "w-8 sm:w-10 md:w-12"
            }`}
            onMouseEnter={() => setSelectedIndex(i)}
            onClick={() => {
              setSelectedIndex(i)
              setIsModalOpen(true)
            }}
          >
            <img
              src={imageUrl}
              alt={`Image ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-105"
              loading="lazy"
            />
            {selectedIndex === i && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3 transition-opacity duration-300">
                <span className="text-[10px] text-white font-mono uppercase tracking-wider bg-black/45 px-2 py-0.5 rounded border border-white/10">
                  CREATION_#{i + 1}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-content-center backdrop-blur-md bg-black/60"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer overflow-hidden rounded-xl bg-[#0d0d0d] border border-neutral-800 p-2 shadow-2xl max-w-lg w-full"
            >
              <div className="relative aspect-square w-[320px] sm:w-[400px]">
                <img
                  src={images[selectedIndex]}
                  alt={`Expanded Creation ${selectedIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-black border border-white/10 text-white flex items-center justify-center text-sm transition"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
