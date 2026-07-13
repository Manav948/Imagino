import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../context/AuthContext";
import HoverExpand from "../components/ui/hover-expand";
import Gallery from "../components/Gallery";
import UserRating from "../components/UserRating";

import HeroSection from "../components/home/HeroSection";
import BentoFeatures from "../components/home/BentoFeatures";
import AboutSection from "../components/home/AboutSection";
import HomeFooter from "../components/home/HomeFooter";

import image1 from "../images/image4.png";
import image2 from "../images/image5.png";
import image3 from "../images/image6.png";
import image4 from "../images/image16.webp";
import image5 from "../images/image17.webp";
import image6 from "../images/image23.webp";
import image7 from "../images/image12.jpg";
import image8 from "../images/image13.jpg";
import image25 from "../images/image25.webp";
import image26 from "../images/image26.webp";
import image27 from "../images/image27.jpg";

gsap.registerPlugin(ScrollTrigger);

const initialSliderImages = [image1, image2, image3, image4, image5, image6, image7, image8, image25, image26, image27];

const Home = () => {
  const { user } = useAuth();
  const [sliderImages] = useState([...initialSliderImages]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.utils.toArray(".fade-up").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const userName = user?.name || user?.email?.split('@')[0] || user?.username || 'Creator';

  return (
    <div className="text-white bg-[#0b0b0b] min-h-screen relative overflow-hidden font-sans-modern pt-20">
      
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pl-2">
          <span>000</span>
          <span>050</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>250</span>
          <span>300</span>
          <span>350</span>
          <span>400</span>
          <span>450</span>
          <span>500</span>
          <span>550</span>
          <span>600</span>
          <span>650</span>
          <span>700</span>
          <span>750</span>
          <span>800</span>
        </div>
      </div>

      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-20">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-600 pr-2 right-0 text-right">
          <span>000</span>
          <span>050</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>250</span>
          <span>300</span>
          <span>350</span>
          <span>400</span>
          <span>450</span>
          <span>500</span>
          <span>550</span>
          <span>600</span>
          <span>650</span>
          <span>700</span>
          <span>750</span>
          <span>800</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-800/80 relative">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <HeroSection user={user} userName={userName} />

      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <BentoFeatures />

      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <section className="py-16 fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-[#111111] text-xs text-neutral-400 font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
            Masterpiece Slider
          </div>
          <h3 className="text-3xl md:text-5xl font-editorial font-normal mb-4">
            Deep Dive Into Our <span className="italic text-neutral-400">AI Creations</span>
          </h3>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
            Hover to expand and investigate stunning details of images compiled by community users.
          </p>
        </div>
        <div>
          <HoverExpand
            images={sliderImages}
            initialSelectedIndex={0}
            thumbnailHeight={200}
            modalImageSize={400}
            maxThumbnails={11}
          />
        </div>
      </section>

      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <section className="fade-up">
        <Gallery />
      </section>

      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <AboutSection />

      <div className="relative w-full h-[1px] bg-neutral-800/80 my-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <section className="fade-up">
        <UserRating />
      </section>

      <HomeFooter />

    </div>
  );
};

export default Home;