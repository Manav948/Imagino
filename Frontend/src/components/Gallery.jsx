import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../images/image18.jpg";
import img2 from "../images/image19.jpg";
import img3 from "../images/image20.webp";
import img4 from "../images/image21.jpg";
import img5 from "../images/image22.jpg";
import img6 from "../images/image23.webp";

gsap.registerPlugin(ScrollTrigger);

const demoImages = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll(".gallery-item");

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-transparent text-white py-16 px-6 md:px-24 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-[#111111] text-xs text-neutral-400 font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
          Pre-Compiled Showcases
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-normal leading-tight">
          Explore Our <span className="italic text-neutral-400">Creative Gallery</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {demoImages.map((img, idx) => (
          <div
            key={idx}
            className="gallery-item relative rounded-lg overflow-hidden border border-neutral-800/80 bg-[#111111]/40 shadow-lg hover:border-neutral-700 transition-all duration-300"
          >
            <img
              src={img}
              alt={`Generated ${idx + 1}`}
              className="w-full h-48 object-cover hover:scale-105 duration-500 transition-all filter saturate-[0.85] hover:saturate-100"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 bg-neutral-900/90 border border-neutral-800 text-[9px] font-mono px-2 py-0.5 rounded text-neutral-400">
              IMG_0{idx + 1}.PNG
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
