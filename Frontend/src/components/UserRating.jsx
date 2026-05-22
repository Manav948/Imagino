import React from "react";
import { motion } from "framer-motion";
import { MessageSquareCode } from "lucide-react";
import image1 from "../images/image14.png";
import image2 from "../images/image15.png";
import image3 from "../images/image16.webp";
import image4 from "../images/image17.webp";

const reviews = [
  {
    image: image1,
    name: "Aarav Mehta",
    message: "Absolutely love the AI art! The prompts are powerful and fun.",
    location: "India",
  },
  {
    image: image2,
    name: "Lena Fischer",
    message: "Impressed by how easy it is to generate stunning images!",
    location: "Germany",
  },
  {
    image: image3,
    name: "Daniel Park",
    message: "Beautiful interface. The gallery feature is amazing.",
    location: "South Korea",
  },
  {
    image: image4,
    name: "Emily Johnson",
    message: "Great experience! Generated artwork exceeded my expectations.",
    location: "USA",
  },
];

const UserReviews = () => {
  return (
    <section className="mt-32 px-6 md:px-24 relative">
      {/* Background coordinate grid helper lines */}
      <div className="absolute left-6 md:left-24 right-6 md:right-24 top-0 h-[1px] bg-neutral-800/80" />
      
      {/* Heading */}
      <div className="text-center mb-16 pt-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-neutral-800 bg-[#111111] text-[9px] font-mono text-neutral-500 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
          FEEDBACK_TELEMETRY
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-normal leading-tight">
          Synthesizer <span className="italic text-neutral-400">User Reviews</span>
        </h2>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative rounded bg-[#111111]/40 border border-neutral-800 p-6 flex flex-col justify-between hover:border-[#ff4a1c]/60 hover:shadow-[0_0_15px_rgba(255,74,28,0.05)] transition-all duration-300"
          >
            {/* Corner Bracket decorations */}
            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-neutral-600">
              VERIFIED_OP_0{index + 1}
            </div>
            
            <div className="absolute -top-[3px] left-6 w-1.5 h-1.5 bg-[#ff4a1c]" />

            {/* Message block */}
            <div className="mb-6 relative">
              <MessageSquareCode className="w-4 h-4 text-neutral-600 mb-3" />
              <p className="font-mono text-[11px] text-neutral-400 leading-relaxed italic">
                “{review.message}”
              </p>
            </div>

            {/* User Details */}
            <div className="flex items-center gap-3 border-t border-neutral-900 pt-4 mt-auto">
              <div className="relative flex-shrink-0">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-sm border border-neutral-800 object-cover filter saturate-[0.8]"
                />
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-[#ff4a1c]" />
              </div>
              <div className="overflow-hidden">
                <p className="font-mono text-xs font-bold text-white truncate uppercase tracking-wider">
                  {review.name}
                </p>
                <p className="font-mono text-[9px] text-[#ff4a1c]">
                  LOC // {review.location.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
