import './ProjectSlider.css';
import slide1 from '../images/bg4.jpg';
import slide2 from '../images/lux.jpg';
import slide3 from '../images/bg6.jpg';
import slide4 from '../images/item9.png';
import slide5 from '../images/why2.jpg';
import slide6 from '../images/item11.jpg';
import slide7 from '../images/item13.jpg';
import slide8 from '../images/bg5.jpg';
import slide9 from '../images/ca2.jpg';
import slide10 from '../images/ca3.jpg';
import slide11 from '../images/ca3.png';
import slide12 from '../images/ca5.png';
import slide13 from '../images/ca6.png';
import slide14 from '../images/ca7.png';
import slide15 from '../images/ca8.png';

import { useState, useEffect, useRef } from 'react';

function ProjectSlider() {
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const galleryRef = useRef(null);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchEndX(null); // Reset touch end
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className='luxury-gallery-wrapper'>
      <div className='gallery-header'>
        <h2 className='luxury-title'>A World Of <span style={{color:"#f07c2e",fontWeight:'550'}}>Luxury</span></h2>
        <h5 className='luxury-description'>
          Explore premier living with DXB Global Estates — from iconic developments to tailored luxury homes, we bring Dubai's most exceptional real estate within your reach.
        </h5>
      </div>

      <div className='gallery-container'>
        <div 
          className='luxury-gallery'
          ref={galleryRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              className={`gallery-slide ${index === currentIndex ? 'active' : ''}`}
              key={index}
              style={{ backgroundImage: `url(${slide})` }}
              role="img"
              aria-label={`Luxury property slide ${index + 1}`}
            >
              <div className='slide-overlay'></div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            className="gallery-nav-btn gallery-prev-btn" 
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button 
            className="gallery-nav-btn gallery-next-btn" 
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>

          {/* Dots navigation */}
          <div className="gallery-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSlider;