import React, { useEffect, useRef, useState } from 'react';
import './VirtualRoomTour.css';

const INITIAL_MODE = 'tour'; 
const RESIMO_BASE =
  'https://allinone.prod.resimo.io/gj-properties/creek-towers/#/?app=0&lang=en'
  + '&types=1BHK,2BHK,3BHK'
  + '&view=apartment'
  + '&sidebar=off';

const RESIMO_URL = `${RESIMO_BASE}&mode=${INITIAL_MODE}`;

const VirtualRoomTour = () => {
  const frameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);   // only mount src when visible
  const [loaded, setLoaded] = useState(false);         // swap skeleton once ready

  // 1) Preconnect to Resimo to speed up TLS & DNS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://allinone.prod.resimo.io';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const dns = document.createElement('link');
    dns.rel = 'dns-prefetch';
    dns.href = 'https://allinone.prod.resimo.io';
    document.head.appendChild(dns);

    return () => {
      link.remove();
      dns.remove();
    };
  }, []);

  // 2) Lazy-load: set iframe src only when the container is in view
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible(true);
            io.disconnect();
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="convir">
      <h2 className="virtualheading">Virtual Tour</h2>

      <div className="virtual-tour-page">
        {/* Skeleton placeholder while the iframe loads */}
        {!loaded && (
          <div className="tour-skeleton" aria-hidden="true">
            <div className="skeleton-title">3D Search Engine</div>
            <div className="skeleton-sub">Loading…</div>
            <div className="skeleton-box" />
          </div>
        )}

        <iframe
          ref={frameRef}
          className={`tour-iframe ${loaded ? 'is-loaded' : 'is-loading'}`}
          /* 3) Only set src when visible; keeps initial page snappy */
          src={isVisible ? RESIMO_URL : 'about:blank'}
          title="Ajman Creek Towers — 1/2/3 BHK • 3D & Virtual Tour"
          allowFullScreen
          loading="lazy"
          fetchpriority="high"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default VirtualRoomTour;
