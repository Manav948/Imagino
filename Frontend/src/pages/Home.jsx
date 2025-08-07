import React, { useEffect, useState } from 'react';
import PromptForm from '../components/Input';
import ImageCard from '../components/ImageCard';
import Slider from '../components/Silder';
import Footer from '../components/Footer';
import UserRating from '../components/UserRating';
import Gallery from '../components/Gallery';
import image from '../images/image11.jpg';
import aboutImage from '../images/image3.png';
import { generateImage, storeImageToHistory } from '../lib/imageService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import image1 from '../images/image4.png';
import image2 from '../images/image5.png';
import image3 from '../images/image6.png';
import image4 from '../images/image9.jpg';
import image5 from '../images/image10.jpg';
import image6 from '../images/image11.jpg';
import image7 from '../images/image12.jpg';
import image8 from '../images/image13.jpg';
import axios from 'axios';

const initialSliderImages = [image1, image2, image3, image4, image5, image6, image7, image8];

const Home = () => {
  const [generatedImages, setGeneratedImages] = useState([
    {
      imageUrl: image,
      prompt: "Beautiful Nature Image",
      createdBy: "Admin"
    }
  ]);
  const { user } = useAuth();
  const [sliderImages, setSliderImages] = useState([...initialSliderImages]);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async (prompt) => {
    if (!prompt) {
      toast.error("enter a prompt");
    }
    if (!user?._id) {
      toast.error("Please log in to generate images.");
      return;
    }
    try {
      setLoading(true);
      const res = await generateImage(prompt, user._id);
      const newImage = {
        imageUrl: res.resultImage,
        prompt,
        createdBy: user.username || "You"
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      await storeImageToHistory(prompt, res.resultImage)
    } catch (error) {
      toast.error("Failed to generate image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToSlider = (imageUrl) => {
    if (!sliderImages.includes(imageUrl)) {
      setSliderImages(prev => [...prev, imageUrl]);
    }
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('api/users/images', { withCredentials: true });
        const storeImage = res?.data?.images || [];
        setGeneratedImages(storeImage.map(img => ({
          imageUrl: img.imageUrl,
          prompt: img.prompt,
          createdBy: user?.username || "You"
        })))
      } catch (error) {
        console.log("Error in fetch image function : ", error);
      }
    }
    if (user?._id) {
      fetchImage();
    }
  }, [user])

  return (
    <div className="text-white">
      <PromptForm onSubmit={handleGenerateImage} />

      <div className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Explore Stunning AI Art Gallery
        </h2>
        <p className="mt-2 text-gray-400 text-base md:text-lg">
          Discover unique creations made with powerful AI imagination.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mt-10 px-4">
        {generatedImages.map((img, index) => (
          <ImageCard
            key={index}
            imageUrl={img.imageUrl}
            prompt={img.prompt}
            createdBy={img.createdBy}
            onAddToSlider={handleAddToSlider}
          />
        ))}
      </div>

      {/* Slider */}
      <div className="mt-20 text-center">
        <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Deep Dive Into Our AI Creations
        </h3>
        <div className="w-96 h-1 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-md shadow-purple-500/30" />
      </div>
      <div className="mt-20">
        <Slider images={sliderImages} />
      </div>

      {/* About Section */}
      <section className="mt-24 px-6 md:px-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#ffffff0a] via-[#ffffff10] to-[#ffffff05] backdrop-blur-md shadow-lg border border-white/10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="absolute -top-8 -left-8 w-52 h-52 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 rounded-full blur-3xl opacity-30 z-0" />
          <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-3xl opacity-50 z-0" />
          <div className="relative z-10 w-full md:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 text-transparent bg-clip-text mb-5">
              Unlock Creativity with Smarter Prompts
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Discover the power of <span className="text-white font-semibold">Promptify.AI</span> — your creative co-pilot for crafting detailed and inspiring prompts.
              <br /><br />
              Effortlessly combine <span className="text-white font-semibold">concepts, styles, moods, and lighting</span> to bring your imagination to life.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-1/2 flex justify-center">
            <img
              src={aboutImage}
              alt="About Promptify.AI"
              className="rounded-2xl shadow-2xl w-full max-w-xs object-cover"
            />
          </div>
        </div>
        <Gallery />
        <UserRating />
      </section>
      <Footer />
    </div>
  );
};

export default Home;