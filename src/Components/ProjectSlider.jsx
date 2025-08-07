import './ProjectSlider.css';
import slide1 from '../images/bg4.jpg';
import slide2 from '../images/bg5.jpg';
import slide3 from '../images/bg6.jpg';
import { useState, useEffect } from 'react';

function ProjectSlider() {
  const slides = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='ProjectSlider'>
      <h2 className='projecthead'>A World Of Luxury</h2>
      <h5 className='projectsubhead'>
        Explore premier living with DXB Global Estates — from iconic developments to tailored luxury homes, we bring Dubai’s most exceptional real estate within your reach.
      </h5>

      <div className='carousel'>
        {slides.map((slide, index) => (
          <div
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            key={index}
            style={{ backgroundImage: `url(${slide})` }}
          >
            <div className="slide-content">
              <h3 className="slide-title">Project Title {index + 1}</h3>
              <p className="slide-desc">Short description of the property goes here.</p>
              <button className="know-more">KNOW MORE</button>
            </div>
          </div>
        ))}

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectSlider;
