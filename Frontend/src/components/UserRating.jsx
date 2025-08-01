import React from "react";
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
    <div className="mt-32 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
        What Our Users Say
      </h2>
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide ">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative min-w-[280px] max-w-xs bg-gradient-to-br from-[#ffffff0a] via-[#ffffff10] to-[#ffffff05] backdrop-blur-md shadow-lg border border-white/10 rounded-2xl p-6 text-white  hover:scale-95 transition-transform duration-300   "
          >
            <div className="absolute -top-8 -left-8 w-52 h-52 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 rounded-full blur-3xl opacity-20 z-0"></div>
            <div className="relative z-10  ">
              <div className="flex items-center space-x-4 mb-2 ">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border border-white/20"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.location}</p>
                </div>
              </div>
              <p className="text-gray-300 mt-2 italic">"{review.message}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
