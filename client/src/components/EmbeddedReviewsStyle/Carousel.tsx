import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';

interface Review {
  approved: boolean;
  compId: string;
  rating: number;
  username: string;
  review: string;
}

const Carousel: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const nextSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 300); // Duration of the fade-out animation
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [reviews]); // Re-run effect if reviews change

  const prevSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 300); // Duration of the fade-out animation
  };

  return (
    <div className="relative container mx-auto px-4 py-10">
      <div className="overflow-hidden">
        <div className={`flex justify-center transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
          {reviews.length > 0 && (
            <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg shadow-md p-6 transition-transform duration-500">
                <h1 className="text-xl font-bold text-gray-800">{reviews[currentIndex].username}</h1>
                <div className="flex items-center mt-2">
                  <Rating name="read-only" value={reviews[currentIndex].rating} readOnly />
                  <span className="ml-2 text-gray-500 text-sm">({reviews[currentIndex].rating})</span>
                </div>
                <p className="text-gray-700 italic border-l-4 border-blue-500 pl-4 mt-4">
                  "{reviews[currentIndex].review}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
      >
        &#10094; {/* Left Arrow */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
      >
        &#10095; {/* Right Arrow */}
      </button>
    </div>
  );
}

export default Carousel;
