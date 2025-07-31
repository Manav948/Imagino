const Slider = ({ images }) => {
  return (
    <div className="w-full overflow-hidden py-10">
      <div className="animate-slide flex w-max gap-6">
        {[...images, ...images].map((img, index) => (
          <div key={index} className="min-w-[300px] max-w-[300px] rounded-xl shadow-lg shadow-pink-500/30 hover:scale-105 transition-transform duration-300">
            <img
              src={img}
              alt={`slide-${index}`}
              className="rounded-xl object-cover w-full h-[200px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
