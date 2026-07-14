import React, { useState } from "react";
import { toast } from "react-hot-toast";
import PromptForm from "../components/Input";
import Suggestion from "../components/Suggestion";
import ImageCard from "../components/ImageCard";
import { generateImage } from "../lib/imageService";
import { useAuth } from "../context/AuthContext";
import defaultImage from "../images/image24.webp";
import RestrictedAccess from "../components/generate/RestrictedAccess";
import WorkspaceHeader from "../components/generate/WorkspaceHeader";
import GenerationSettings from "../components/generate/GenerationSettings";
import ApiCompilationPanel from "../components/generate/ApiCompilationPanel";
import GuidanceManualPanel from "../components/generate/GuidanceManualPanel";


const cropImageToAspectRatio = (base64Str, aspectRatio) => {
  return new Promise((resolve) => {
    if (aspectRatio === "1:1") {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = img.width;
      const height = img.height;
      let targetWidth = width;
      let targetHeight = height;

      if (aspectRatio === "16:9") {
        targetHeight = width * (9 / 16);
      } else if (aspectRatio === "9:16") {
        targetWidth = height * (9 / 16);
      } else {
        resolve(base64Str);
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Center crop
      const sx = (width - targetWidth) / 2;
      const sy = (height - targetHeight) / 2;

      ctx.drawImage(
        img,
        sx, sy, targetWidth, targetHeight, 
        0, 0, targetWidth, targetHeight   
      );

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

const Generate = () => {
  const { user, login } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([
    {
      imageUrl: defaultImage,
      prompt: "Neon cybercity alleyway with high reflection puddles",
      createdBy: "Admin",
    },
  ]);

  
  const [cfgScale, setCfgScale] = useState(7.5);
  const [steps, setSteps] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [sampler, setSampler] = useState("Euler a");

  const handleGenerateImage = async (promptText) => {
    if (!promptText) {
      toast.error("Please enter a prompt.");
      return;
    }
    const currentUserId = user?._id || user?.userId;
    if (!currentUserId) {
      toast.error("Please log in to generate images.");
      return;
    }
    try {
      setLoading(true);
      const res = await generateImage(promptText, currentUserId, {
        cfgScale,
        steps,
        aspectRatio,
        sampler,
      });

      const croppedImage = await cropImageToAspectRatio(res.resultImage, aspectRatio);

      const newImage = {
        imageUrl: croppedImage,
        prompt: promptText,
        createdBy: user.username || "You",
      };
      setGeneratedImages((prev) => [newImage, ...prev]);
      login({ ...user, imageCount: res.imageCount });
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate image.");
      console.error("Image generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToSlider = (imageUrl) => {
    toast.success("Successfully added to trending showcase list!");
  };

 
  if (!user) {
    return <RestrictedAccess />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">


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

     
      <div className="w-full h-[1px] bg-neutral-800/80 relative mb-12">
        <div className="absolute left-4 md:left-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        <div className="absolute right-4 md:right-12 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24 z-10 relative">

        <WorkspaceHeader user={user} />

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#111111]/40 border border-neutral-800 rounded-xl p-6 shadow-md">
              <PromptForm onSubmit={handleGenerateImage} prompt={prompt} setPrompt={setPrompt} />

              <div className="text-center text-[10px] text-neutral-500 font-mono mt-4">
                ⚠️ Session-only buffer storage. Please download generated images to prevent loss.
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

      
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

       
        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-neutral-800/80 pb-4">
            <h2 className="text-xl font-editorial font-normal">
              Compiled <span className="italic text-neutral-400">Creations Buffer</span>
            </h2>
            <span className="text-[10px] font-mono text-neutral-500">[{generatedImages.length} OBJECTS]</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-6 w-full">
            {generatedImages.length === 0 ? (
              <div className="py-20 text-center text-xs font-mono text-neutral-600">
                NO_OBJECTS_COMPILED. ENTER PROMPT TO EXECUTE.
              </div>
            ) : (
              generatedImages.map((img, index) => (
                <ImageCard
                  key={index}
                  imageUrl={img.imageUrl}
                  prompt={img.prompt}
                  createdBy={img.createdBy}
                  onAddToSlider={handleAddToSlider}
                />
              ))
            )}
          </div>
        </div>

        
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

       
        <div className="relative w-full h-[1px] bg-neutral-800/80 my-16">
          <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
          <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#ff4a1c]" />
        </div>

        <GuidanceManualPanel />

      </div>

    </div>
  );
};

export default Generate;
