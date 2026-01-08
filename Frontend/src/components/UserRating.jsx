import React from "react";
import { motion } from "framer-motion";
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
    <section className="mt-32 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
        What Our Users Say
      </h2>
      <p className="text-center text-sm text-gray-400 mb-4 sm:hidden">
        Swipe to see more →
      </p>
      {/* Review Cards */}
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="snap-start relative min-w-[280px] max-w-sm rounded-2xl 
                       bg-white/5 backdrop-blur-xl border border-white/10 
                       p-6 text-white shadow-xl hover:border-pink-500/30"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-indigo-500/10 blur-2xl -z-10" />
            {/* User */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border border-white/20 object-cover"
              />
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-400">{review.location}</p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-300 italic leading-relaxed">
              “{review.message}”
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
