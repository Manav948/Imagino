import React from 'react';
import img1 from '../images/image18.jpg';
import img2 from '../images/image19.jpg';
import img3 from '../images/image20.webp';
import img4 from '../images/image21.jpg';
import img5 from '../images/image22.jpg';
import img6 from '../images/image23.webp';

const demoImages = [img1, img2, img3, img4, img5,img6];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-br from-yellow-400 via-orange-500 to bg-red-500 bg-clip-text text-transparent mb-20 mt-12">
         Explore Our Creative Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {demoImages.map((img, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ${idx % 2 === 0 ? '' : ''
              }`}
          >
            <img
              src={img}
              alt={`Generated ${idx + 1}`}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-sm px-2 py-1 rounded">
              {idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
