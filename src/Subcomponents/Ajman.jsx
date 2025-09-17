import { useEffect, useRef, useState } from 'react';
import './Ajman.css';

import Ajmanimg from '../images/ajman.png';
import money from '../images/money.png';
import building from '../images/building.png';
import floor from '../images/floor-plan.png';
import bed from '../images/bed.png';

import FloorPlans from './FloorPlans';
import VirtualRoomTour from './VirtualRoomTour';
import Amenities from './Amenities';
import ContactUs from './Contactsub';

// Use the NEW popup only for "Know More" (pure-PHP email sender)
import EnquiryPopup2 from '../Components/EnquiryPopup2';

import car1 from '../Subcomponents/subimages/InteriorRenders/living2.jpg';
import car2 from '../Subcomponents/subimages/InteriorRenders/kitchen.jpg';
import car3 from '../Subcomponents/subimages/ExteriorRenders/mainhead.png';
import car4 from '../Subcomponents/subimages/InteriorRenders/living.jpg';
import car5 from '../Subcomponents/subimages/InteriorRenders/reception.jpg';
import car7 from '../Subcomponents/subimages/InteriorRenders/bed1.jpg';
import car8 from '../Subcomponents/subimages/InteriorRenders/pool.jpg';
import car9 from '../Subcomponents/subimages/InteriorRenders/reception2.jpg';

import gal1 from '../Subcomponents/subimages/ExteriorRenders/ajman3.jpg';
import gal2 from '../Subcomponents/subimages/InteriorRenders/bed1.jpg';
import gal3 from '../Subcomponents/subimages/InteriorRenders/living2.jpg';
import gal4 from '../Subcomponents/subimages/InteriorRenders/living.jpg';

function Ajman() {
  // =========================
  // HERO (ProjectSlider-style)
  // =========================
  const heroSlides = [car3, car1, car2, car4, car5, car7, car8, car9];

  const [heroIndex, setHeroIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const heroRef = useRef(null);
  const minSwipeDistance = 50;

  const goHeroTo = (i) => setHeroIndex(i);
  const goHeroPrev = () =>
    setHeroIndex((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const goHeroNext = () => setHeroIndex((p) => (p + 1) % heroSlides.length);

  const onHeroTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onHeroTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const onHeroTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goHeroNext();
    else if (isRightSwipe) goHeroPrev();
  };

  // =========================
  // ENQUIRE POPUP (Know More only)
  // =========================
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const openEnquire = () => setIsEnquireOpen(true);
  const closeEnquire = () => setIsEnquireOpen(false);

  // Lock body scroll only when Enquire modal is open
  useEffect(() => {
    document.body.style.overflow = isEnquireOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEnquireOpen]);

  // =========================
  // NEW LOCATION GALLERY
  // =========================
  const locationCards = [
    { id: 1, title: 'EXTERIOR VIEW', subtitle: 'Building Architecture', image: gal1, bgImage: gal1 },
    { id: 2, title: '1 BEDROOM', subtitle: 'Apartment Interior', image: gal2, bgImage: gal2 },
    { id: 3, title: '2 BEDROOM', subtitle: 'Spacious Living', image: gal3, bgImage: gal3 },
    { id: 4, title: '3 BEDROOM', subtitle: 'Premium Suite', image: gal4, bgImage: gal4 },
  ];

  const [selectedLocation, setSelectedLocation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLocationSelect = (index) => {
    if (index === selectedLocation || isTransitioning) return;
    setIsTransitioning(true);
    setSelectedLocation(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <div className="ajman-container">
      {/* ===== HERO ===== */}
      <h1 className="aj-hero-title">Ajman Creek Towers</h1>

      <section className="aj-hero-wrapper" aria-label="Ajman Creek hero">
        <div
          className="aj-hero"
          ref={heroRef}
          onTouchStart={onHeroTouchStart}
          onTouchMove={onHeroTouchMove}
          onTouchEnd={onHeroTouchEnd}
        >
          {heroSlides.map((src, index) => (
            <div
              key={index}
              className={`aj-hero-slide ${index === heroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
              role="img"
              aria-label={`Ajman hero slide ${index + 1}`}
            >
              <div className="aj-hero-overlay" />
            </div>
          ))}

          {/* Dots */}
          <div className="aj-hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`aj-hero-dot ${index === heroIndex ? 'active' : ''}`}
                onClick={() => goHeroTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brochure buttons (direct download) */}
      <div className="broucherdiv">
        <a className="btnbro" href="/brochures/ajman_ar.pdf" download>
          Download Brochure (Arabic)
        </a>
        <a className="btnbro" href="/brochures/ajman_en.pdf" download>
          Download Brochure (English)
        </a>
      </div>

      {/* Intro Section */}
      <section className="ajman-creek-section">
        <div className="ajman-creek-content">
          <div className="ajman-creek-image">
            <img src={Ajmanimg} alt="Ajman Creek Towers" className="ajmanimge" />
          </div>

          <div className="ajman-creek-text">
            <h3 className="ajman-creek-heading">EXPERIENCE LUXURIOUS LIFESTYLE</h3>
            <h4 className="ajman-creek-subheading">Invest in Ajman Creek Towers</h4>
            <p className="ajman-creek-description">
              Envisioned with contemporary lifestyles, these distinctive residences offer a truly
              urban setting inside and out. Sophisticated design details feature across the
              well-thought-out interiors, fitted kitchens and spacious bathrooms, each blending in
              perfectly to reflect the unique taste of its residents.
            </p>

            <h2 className="headingf ajman-creek-future">Future Of Living</h2>

            <div className="ajman-creek-features">
              <div className="ajman-feature-item" style={{ marginTop: '1rem' }}>
                <span className="ajman-feature-icon">
                  <img src={floor} alt="floor" style={{ width: '2rem', height: '2rem' }} />
                </span>
                <p>1 , 2 and 3 bedroom apartments, commercial space</p>
              </div>
              <div className="ajman-feature-item" style={{ marginTop: '1rem' }}>
                <span className="ajman-feature-icon">
                  <img src={bed} alt="bed" style={{ width: '2rem', height: '2rem' }} />
                </span>
                <p>Well-appointed health and wellness</p>
              </div>
              <div className="ajman-feature-item" style={{ marginTop: '2.7rem' }}>
                <span className="ajman-feature-icon">
                  <img src={building} alt="building" style={{ width: '2rem', height: '2rem' }} />
                </span>
                <p>Easy access to Sharjah and Dubai</p>
              </div>
              <div className="ajman-feature-item" style={{ marginTop: '2.7rem' }}>
                <span className="ajman-feature-icon">
                  <img src={money} alt="money" style={{ width: '2rem', height: '2rem' }} />
                </span>
                <p>
                  Affordable payments plans <br />
                  with zero interest
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="ajman-investment-section ajman-theme-orange">
        <header className="ajman-investment-header">
          <div className="ajman-investment-title">
            <h1 className="ajman-title-text">A LEGACY OF EXCELLENCE IN</h1>
            <h1 className="ajman-title-text ajman-title-strong">LUXURY REAL ESTATE</h1>
          </div>
          <p className="ajman-sublead">
            DXB Global Estates Properties, a part of the prestigious DXB Global Group, has been
            redefining the luxury real estate landscape in the Middle East since 1982, offering a
            portfolio of iconic residential, commercial, and leisure properties across the region and
            beyond.
          </p>
        </header>

        <div className="ajman-investment-details">
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number">AED 804,000*</h2>
            <p className="ajman-card-text">Starting price</p>
          </div>
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number">8–10%**</h2>
            <p className="ajman-card-text">High rental returns</p>
          </div>
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number">20% Downpayment </h2>
            <p className="ajman-card-text"> then 1% Easy monthly payment  plan</p>
          </div>
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number"> At 40%**</h2>
            <p className="ajman-card-text">Handover</p>
          </div>
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number">TAX FREE</h2>
            <p className="ajman-card-text">Property Investment </p>
          </div>
          <div className="ajman-detail-card">
            <h2 className="ajman-card-number">AED 2 MILLION</h2>
            <p className="ajman-card-text">
              10 years Golden Visa Eligibility property worth
            </p>
          </div>
        </div>

        <div className="ajman-cta-wrap">
          {/* Open NEW EnquiryPopup2 on click */}
          <button type="button" className="ajman-cta" style={{ border: 'none' }} onClick={openEnquire}>
            Know More
          </button>
        </div>

        <p className="ajman-footnote">
          *Terms and conditions apply. **Based on branded projects in the last two years.
        </p>
      </section>

      {/* ===== NEW LOCATION GALLERY ===== */}
      <h6 className="gallery-title">Property Gallery</h6>
      <section className="location-gallery-section">
        <div className="location-gallery-header">
          <div className="gallery-counter">
            <span className="current-number">
              {String(selectedLocation + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="location-gallery-container">
          {/* Background Image */}
          <div className="gallery-background">
            {locationCards.map((card, index) => (
              <div
                key={card.id}
                className={`gallery-bg-image ${index === selectedLocation ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                style={{ backgroundImage: `url(${card.bgImage})` }}
              />
            ))}
            <div className="gallery-bg-overlay" />

            {/* Main Content */}
            <div className="gallery-main-content">
              <div className="gallery-location-info">
                <div className="gallery-breadcrumb">Ajman Creek Towers</div>
                <h1 className="gallery-location-title">
                  {locationCards[selectedLocation]?.title}
                </h1>
                <p className="gallery-location-subtitle">
                  {locationCards[selectedLocation]?.subtitle}
                </p>
              </div>

              {/* Location Cards */}
              <div className="gallery-cards-container">
                <div className="gallery-cards-track">
                  {locationCards.map((card, index) => (
                    <div
                      key={card.id}
                      className={`gallery-location-card ${index === selectedLocation ? 'active' : ''}`}
                      onClick={() => handleLocationSelect(index)}
                    >
                      <div className="gallery-card-image">
                        <img src={card.image} alt={card.title} />
                        <div className="gallery-card-overlay" />
                      </div>
                      <div className="gallery-card-content">
                        <h3 className="gallery-card-title">{card.title}</h3>
                        <p className="gallery-card-subtitle">{card.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW EnquiryPopup2 render */}
      {isEnquireOpen && (
        <EnquiryPopup2
          isOpen={isEnquireOpen}
          onClose={closeEnquire}
          projectName="Ajman Creek Towers"
        />
      )}

      <FloorPlans />
      <VirtualRoomTour />
      <Amenities />
      <ContactUs />
    </div>
  );
}

export default Ajman;
