import './hero.css';
import { useState } from 'react';
import EnquiryPopup from '../Components/EnquiryPopup';
function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className='hero' >
        <h1 style={{fontWeight:"500"}}>DXB Global Estates</h1>
        <h2 style={{fontWeight:"500"}}>Building  Trust, Selling  Dreams</h2>
        <div className='btngrp'>
            <button className='btn1'><a href="#contact" style={{color:"white",textDecoration:"none"}}>Get In Touch</a></button>
            <button className='btn1'  onClick={() => setIsPopupOpen(true)}>Learn More</button>
        </div>
         <EnquiryPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        title="LEARN MORE ABOUT DXB GLOBAL"
      />
    </div>
  );
}

export default Hero;
