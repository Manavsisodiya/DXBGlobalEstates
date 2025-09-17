import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check both viewport width AND device characteristics
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasSmallViewport = window.innerWidth <= 929;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Consider it mobile if it's a mobile device OR has small viewport with touch
      setIsMobile(isMobileDevice || (hasSmallViewport && hasTouch) || hasSmallViewport);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
  }, [menuOpen]);

  return (

    <div className='navcontain' id='home'>
      <div className='logosec'>
        <h1>DXBGlobal</h1>
      </div>

      {/* Desktop Navlist */}
      <div className={`navlist ${isMobile ? 'mobile-hidden' : 'desktop'}`}>
        <a href="#home"><h5>Home</h5></a>
        <a href="#projects"><h5>Our Projects</h5></a>
        <a href="#about"><h5>About us</h5></a>
        <a href="#team"><h5>Our Team</h5></a>
        <a href="#home"><h5>Blog/News</h5></a>
        <a href="#contact"><h5>Contact Us</h5></a>
      </div>

      {/* Hamburger (mobile only) */}
      <div 
        className={`hamburger ${menuOpen ? 'open' : ''} ${isMobile ? 'mobile-show' : 'mobile-hidden'}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div className={`mobile-overlay ${menuOpen ? 'show' : ''}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>×</div>
        <h2 className='head'>DXB Global</h2>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Our Projects</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>Our Team</a>
        <a href="#home" onClick={() => setMenuOpen(false)}>Blog/News</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
      </div>
    </div>
  );
}

export default Navbar;