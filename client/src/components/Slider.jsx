/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Slider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("images", images);
  }, [images]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* <!-- Carousel wrapper --> */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images && Array.isArray(images) && images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={image}
                className={`duration-700 ease-in-out absolute inset-0 transition-opacity ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={`http://localhost:4010/${image}`}
                  className="block w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center">No images available</p>
          )}
        </div>

        {/* <!-- Slider indicators --> */}
        {images && images.length > 1 && (
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  idx === activeIndex ? "bg-white" : "bg-gray-400"
                }`}
                aria-current={idx === activeIndex}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        )}

        {/* <!-- Slider controls --> */}
        {images && images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={handlePrev}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={handleNext}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
