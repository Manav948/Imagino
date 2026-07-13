import React from "react";
import aboutImage from "../../images/image3.png";

const AboutSection = () => {
  return (
    <section className="px-6 md:px-24 py-12 max-w-7xl mx-auto z-10 fade-up">
      <div className="relative rounded-2xl bg-[#111111]/60 border border-neutral-800 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
        <div className="relative z-10 w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-editorial font-normal mb-5 leading-tight">
            Unlock creativity with <span className="italic text-neutral-400">Smarter Prompts</span>
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">
            Discover the power of <span className="text-white font-semibold">Promptify.AI</span> — your creative co-pilot for crafting detailed and inspiring prompts.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Effortlessly combine concepts, styles, moods, and lighting to bring your imagination to life. Compile tags step-by-step and steer our neural weights precisely.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-1/2 flex justify-center">
          <img
            src={aboutImage}
            alt="About Promptify.AI"
            className="rounded border border-neutral-800 shadow-2xl w-full max-w-xs object-cover filter contrast-110 saturate-75"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
