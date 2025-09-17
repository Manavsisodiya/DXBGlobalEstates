import './OurProperties.css';
import bg1 from '../images/bg3.jpg'
import bglux from '../images/bglux.png'
import lux from '../images/lux.jpg'
import locate from '../images/locate.png'
import { useState } from 'react';
import EnquiryPopup from '../Components/EnquiryPopup';
import { Link } from 'react-router-dom';
function OurProperties() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <div className='our-properties' id='projects'>
            <h2 className='project-head2'>Explore <span style={{ color: "#f07c2e", fontWeight: '550' }}>Our Iconic</span> Properties</h2>
            <h5 className='project-subhead2'>
                DXB Global Estates specializes in premium properties across Dubai, blending modern design with exceptional quality. From stylish city apartments to tranquil gated communities, we craft lifestyle-driven spaces that elevate luxury living.
            </h5>
            <div className='properties-container'>
                <div className='properties-grid'>
                    <div className='property-card'>
                        <img className='property-image' alt='Ajman Creek Towers' src={lux} />
                        <div className='property-content'>
                            <h2>Ajman Creek Towers</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Rashid Street, Ajman, UAE</span>
                            </h3>
                            <h4>FROM USD 219,000*</h4>
                            <Link to='/ajman'><button className='enquire-btn'>Enquire Now</button></Link>  
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Ajman Creek Towers' src={bglux} style={{ objectPosition: '-2rem ' }} />
                        <div className='property-content'>
                            <h2>Estrella</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Majan, Al Barsha, Dubai.</span>
                            </h3>
                            <h4>FROM USD 267,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Riverside Views Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Riverside Views</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Dubai Investment Park UAE</span>
                            </h3>
                            <h4>FROM USD 271,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Islands Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Islands</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Dubailand, Dubai, UAE</span>
                            </h3>
                            <h4>FROM USD 708,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Chelsea Residences Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Chelsea Residences</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Dubai Maritime City, UAE</span>
                            </h3>
                            <h4>FROM USD 632,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>

                    <div className='property-card'>
                        <img className='property-image' alt='Golf Greens Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Golf Greens</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Hills, Dubai, UAE</span>
                            </h3>
                            <h4>FROM USD 470,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Safa Gate Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Safa Gate</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Sheikh Zayed Dubai, UAE</span>
                            </h3>
                            <h4>FROM USD 562,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                    <div className='property-card'>
                        <img className='property-image' alt='Lagoon Views Property' src={bg1} />
                        <div className='property-content'>
                            <h2>Lagoon Views</h2>
                            <h3>
                                <img className='location-icon' alt='location' src={locate} />
                                <span>Dubailand, Dubai, UAE</span>
                            </h3>
                            <h4>FROM USD 383,000*</h4>
                            <button className='enquire-btn' onClick={() => setIsPopupOpen(true)}>Enquire Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <EnquiryPopup 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
                title="LEARN MORE ABOUT DXB GLOBAL"
              />
        </div>
    );
}

export default OurProperties;