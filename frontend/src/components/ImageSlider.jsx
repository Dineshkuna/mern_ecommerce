import React, { useEffect, useState } from 'react'
import '../componentStyles/ImageSlider.css'
const images = [
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png',
    '/images/image4.png'
    
]


function ImageSlider() {

    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
       const interval = setInterval(() => {
             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
  return (
    <div className="image-slider-container">

    <div
      className="slider-images"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((image, index) => (
        <div className="slider-item" key={index}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>

    {/* ✅ dots outside */}
    <div className="slider-dots">
      {images.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() =>setCurrentIndex(index)}
        />
      ))}
    </div>

  </div>
  )
}

export default ImageSlider