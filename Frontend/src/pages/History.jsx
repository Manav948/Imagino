import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard'; 

const History = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/user/images', {
        withCredentials: true,
      });
      setImages(res?.data?.images || []);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();  
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text ">🖼️ Your Image History</h1>

      {loading ? (
        <div className="text-center text-lg mt-10">Loading...</div>
      ) : images?.length === 0 ? (
        <div className="text-center text-lg mt-10">No images generated yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <ImageCard
              key={index}
              imageUrl={img.imageUrl}
              prompt={img.prompt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
