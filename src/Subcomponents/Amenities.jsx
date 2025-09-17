import React from 'react';
import './Amenities.css';

import view from '../Subcomponents/subimages/sunset.png';
import pool from '../Subcomponents/subimages/pool.png';
import gym from '../Subcomponents/subimages/gym.png';
import play from '../Subcomponents/subimages/playground.png';
import parking from '../Subcomponents/subimages/parking.png';
import balcony from '../Subcomponents/subimages/balcony.png';
import cctv from '../Subcomponents/subimages/camera.png';
import security from '../Subcomponents/subimages/policemen.png';
import jogging from '../Subcomponents/subimages/running.png';
import ac from '../Subcomponents/subimages/air.png';

const amenitiesData = [
  { id: 1,  title: 'View of Creek',        imgSrc: view,     imgAlt: 'View of Creek icon' },
  { id: 2,  title: 'Shared Pool',          imgSrc: pool,     imgAlt: 'Shared Pool icon' },
  { id: 3,  title: 'Gym',                  imgSrc: gym,      imgAlt: 'Gym icon' },
  { id: 4,  title: "Children's Play Area", imgSrc: play,     imgAlt: "Children's Play Area icon" },
  { id: 5,  title: 'Parking',              imgSrc: parking,  imgAlt: 'Parking icon' },
  { id: 6,  title: 'Balcony',              imgSrc: balcony,  imgAlt: 'Balcony icon' },
  { id: 7,  title: 'CCTV',                 imgSrc: cctv,     imgAlt: 'CCTV icon' },
  { id: 8,  title: '24 Hour Security',     imgSrc: security, imgAlt: '24 Hour Security icon' },
  { id: 9,  title: 'Jogging Track',        imgSrc: jogging,  imgAlt: 'Jogging Track icon' },
  { id: 10, title: 'Central A/C',          imgSrc: ac,       imgAlt: 'Central A/C icon' },
];

const Amenities = () => {
  return (
    <section className="amenities-section">
      <div className="amenities-container">
        <h2 className="amenities-title">Amenities</h2>
        <p className="amenities-description">
          Discover an extensive range of lifestyle-enhancing amenities.
        </p>
        <p className="amenities-subtitle">
          There's something for everyone in the family.
        </p>

        <div className="amenities-grid" role="list">
          {amenitiesData.map((amenity) => (
            <div key={amenity.id} className="amenity-item" role="listitem">
              <div className="amenity-circle">
                <img
                  src={amenity.imgSrc}
                  alt={amenity.imgAlt}
                  className="amenity-icon"
                  loading="lazy"
                  width="42"
                  height="42"
                  onError={(e) => { e.currentTarget.style.opacity = '0.25'; }}
                />
                <span className="amenity-label">{amenity.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;