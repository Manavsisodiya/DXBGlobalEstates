import React, { useEffect, useState } from "react";
import "./FloorPlans.css";
import floor101 from "./subimages/1beds1.png";
import floor102 from "./subimages/1beds2.png";
import floor103 from "./subimages/1beds3.png";
import floor104 from "./subimages/1beds4.png";
import floor201 from "./subimages/2beds5.png"; 
import floor202 from "./subimages/2beds6.png"; 
import floor203 from "./subimages/2bed12.png";
import floor204 from "./subimages/2beds14.png"; 
import floor301 from "./subimages/3beds1.png"; 
import floor302 from "./subimages/3beds2.png"; 
import floor303 from "./subimages/3bed3.png"; 
import floor304 from "./subimages/3beds4.png";

const floorPlansData = {
  "1 BEDROOM": [
    { type: "Type 1", img: floor101, size: "1,212.80 Sq. ft.", bathrooms: 2, view: "Creek & City View", parking: "Yes", series: "01" },
    { type: "Type 2", img: floor102, size: "1,193.19 Sq. ft.", bathrooms: 2, view: "Creek & City View", parking: "Yes", series: "02" },
    { type: "Type 3", img: floor103, size: "1,085.35 Sq. ft.", bathrooms: 2, view: "Creek & City View", parking: "Yes", series: "03" },
    { type: "Type 4", img: floor104, size: "1,124.74 Sq. ft.", bathrooms: 2, view: "Creek & City View", parking: "Yes", series: "04" },
  ],
  "2 BEDROOM": [
    { type: "Type 1", img: floor201, size: "1,633.70 Sq. ft.", bathrooms: 3, view: "Creek & City View", parking: "Yes", series: "05" },
    { type: "Type 2", img: floor202, size: "1,650.42 Sq. ft.", bathrooms: 3, view: "Creek & City View", parking: "Yes", series: "06" },
    { type: "Type 3", img: floor203, size: "1,587.01 Sq. ft.", bathrooms: 3, view: "Creek & City View", parking: "Yes", series: "12" },
    { type: "Type 4", img: floor204, size: "1,551.61 Sq. ft.", bathrooms: 3, view: "Creek & City View", parking: "Yes", series: "14" },
  ],
  "3 BEDROOM": [
    { type: "Type 1", img: floor301, size: "2,845.70 Sq. ft.", bathrooms: 4, view: "Creek & City View", parking: "Yes", series: "01" },
    { type: "Type 2", img: floor302, size: "3,120.90 Sq. ft.", bathrooms: 4, view: "Creek & City View", parking: "Yes", series: "02" },
    { type: "Type 3", img: floor303, size: "2,650.30 Sq. ft.", bathrooms: 4, view: "Creek & City View", parking: "Yes", series: "03" },
    { type: "Type 4", img: floor304, size: "2,743.60 Sq. ft.", bathrooms: 4, view: "Creek & City View", parking: "Yes", series: "04" },
  ],
};

export default function FloorPlans() {
  const [activeTab, setActiveTab] = useState("1 BEDROOM");
  const [activeIndex, setActiveIndex] = useState(0);

  // animation direction: 'next' | 'prev'
  const [direction, setDirection] = useState("next");
  const plans = floorPlansData[activeTab];
  const total = plans.length;

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");

  const goNext = () => {
    setDirection("next");
    setActiveIndex((i) => (i + 1) % total);
  };

  const goPrev = () => {
    setDirection("prev");
    setActiveIndex((i) => (i - 1 + total) % total);
  };

  const handleDotClick = (idx) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? "next" : "prev");
    setActiveIndex(idx);
  };

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);

  // ESC to close lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isLightboxOpen]);

  // pick animation class based on direction each time index changes
  const animClass = direction === "next" ? "slide-next" : "slide-prev";

  return (
    <div className="floor-plans-container">
      <div className="header-row">
        <h2 className="section-title">Floor Plans</h2>

        <div className="tabs">
          {Object.keys(floorPlansData).map((tab) => (
            <span
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setActiveIndex(0);
                setDirection("next");
              }}
            >
              {tab} <span className="tab-sub">Apartment</span>
            </span>
          ))}
        </div>
      </div>

      {/* Plan Content */}
      <div className="plan-content">
        <div className={`plan-left panel ${animClass}`}>
          <p className="plan-type">{plans[activeIndex].type}</p>

          {/* Thumbnail (image NOT clickable). Only badge opens lightbox */}
          <div className="thumb-wrap" aria-hidden="true">
            <img
              src={plans[activeIndex].img}
              alt={plans[activeIndex].type}
              className="plan-image"
              loading="lazy"
              draggable="false"
            />
            <button
              type="button"
              className="zoom-badge"
              aria-label="Open floor plan"
              onClick={() => openLightbox(plans[activeIndex].img)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={`plan-right panel ${animClass}`}>
          <p>Size : {plans[activeIndex].size}</p>
          <p>No of bathroom : {plans[activeIndex].bathrooms}</p>
          <p>View : {plans[activeIndex].view}</p>
          <p>Car Parking : {plans[activeIndex].parking}</p>
          <p>Series : {plans[activeIndex].series}</p>

          <div className="plan-buttons">
            <a href="/floorplan.pdf" className="download-btn">
              Download floor plans
            </a>
            <button className="enquire-btn3">Enquire</button>
          </div>
        </div>
      </div>

      {/* Carousel navigation (arrows + dots) */}
      <div className="carousel-nav">
        <button type="button" className="carousel-arrow prev" onClick={goPrev} aria-label="Previous">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/></svg>
        </button>

        <div className="dots">
          {plans.map((_, index) => (
            <span
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        <button type="button" className="carousel-arrow next" onClick={goNext} aria-label="Next">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/></svg>
        </button>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" type="button" aria-label="Close" onClick={closeLightbox}>×</button>
            <img src={lightboxSrc} alt="Floor plan large" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}