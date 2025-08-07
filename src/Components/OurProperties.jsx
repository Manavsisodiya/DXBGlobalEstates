import './OurProperties.css';
import bg1 from '../images/bg3.jpg'
import locate from '../images/locate.png'
function OurProperties() {
    return (
        <div className='OurProperties'>
            <h2 className='projecthead1'>Explore Our Iconic Properties</h2>
            <h5 className='projectsubhead1'>
                DXB Global Estates specializes in premium properties across Dubai, blending modern design with exceptional quality. From stylish city apartments to tranquil gated communities, we craft lifestyle-driven spaces that elevate luxury living.
            </h5>
            <div className='pcardsections'>
                <div className='cardsrow1'>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2> Riverside Views</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Dubai Investment Park 2, UAE</span></h3>
                        <h4>FROM USD 271,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2> Islands</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Dubailand, Dubai, UAE</span></h3>
                        <h4>FROM USD 708,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2>Chelsea Residences</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Dubai Maritime City, UAE</span></h3>
                        <h4>FROM USD 632,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2>Canal Heights II</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Business Bay, Dubai, UAE</span></h3>
                        <h4>FROM USD 741,000*</h4>
                        <button>Enquire Now</button>
                    </div>

                </div>
                <div className='cardsrow2'>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2>Safa Two - Tower B</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Sheikh Zayed Road, Dubai, UAE</span></h3>
                        <h4>FROM USD 698,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2>Golf Greens</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}> Hills, Dubai, UAE</span></h3>
                        <h4>FROM USD  470,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2>Safa Gate</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Sheikh Zayed Road, Dubai, UAE</span></h3>
                        <h4>FROM USD 562,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                    <div className='card'>
                        <img className='cardimg2' alt='img' src={bg1} />
                        <h2> Lagoon Views</h2>
                        <h3><img className='cardimg3' alt='logo' src={locate} /><span style={{ marginLeft: '0.2rem', marginBottom: '0.5rem' }}>Dubailand, Dubai, UAE</span></h3>
                        <h4>FROM USD 383,000*</h4>
                        <button>Enquire Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurProperties;
