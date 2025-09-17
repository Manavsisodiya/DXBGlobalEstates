// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Hero from './Components/hero';
import About from './Components/About';
import WhyUs from './Components/WhyUs';
import Expertise from './Components/Expertise';
import OurProperties from './Components/OurProperties';
import ProjectSlider from './Components/ProjectSlider';
import WhyDubai from './Components/WhyDubai';
import Team from './Components/Team';
import Getintouch from './Components/Getintouch';
import Ajman from './Subcomponents/Ajman';
import Footer from './Components/Footer';

import bgvid from './assets/bgvid.mp4';

const AJMAN_ONLY = process.env.REACT_APP_AJMAN_ONLY === 'true';
const BASENAME = process.env.PUBLIC_URL || '/';

function AjmanPage() {
  return (
    <>
      <Ajman />
      <Footer />
    </>
  );
}

function Home() {
  return (
    <>
      <div className="container">
        <video
          className="background-video"
          src={bgvid}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="video-overlay" />
        <Navbar />
        <Hero />
      </div>

      <About />
      <WhyUs />
      <Expertise />
      <OurProperties />
      <ProjectSlider />
      <WhyDubai />
      <Team />
      <Getintouch />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        {AJMAN_ONLY ? (
          // Ajman-only build: serve Ajman for ANY route under /ajman
          <Route path="*" element={<AjmanPage />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {/* Link to your Ajman sub-app living at /ajman */}
            {/* (No React route needed here, the server will serve /ajman/index.html) */}
            <Route path="*" element={<Home />} />
            <Route path="/ajman" element={<AjmanPage />} />
            
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
