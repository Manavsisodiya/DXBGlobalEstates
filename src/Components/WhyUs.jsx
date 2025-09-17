import './WhyUs.css';
import home from '../images/home.png';
import building from '../images/office.png';
import achieve from '../images/trophy.png';
import globe from '../images/globe.png';
import rightImage from '../images/ca5.png'; 

function WhyUs() {
    return (
        <div className='whysec'>
            <h2>
                Why <span style={{ color: "#f07c2e", fontWeight: '500' }}>DXB Global Estates?</span>
            </h2>
            <h3>
                DXB Global Estates is a premier real estate brand renowned for its integrity, local expertise, and bespoke property solutions. 
                With deep roots in Dubai's dynamic market and a commitment to excellence, we deliver exceptional residential, commercial, and 
                investment opportunities tailored to modern lifestyles and global standards.
            </h3>

            <div className='videossec'>
                {/* Left Section */}
                <div className='leftcorner'>
                    <div className='cardrow1'>
                        <div className='home'>
                            <img src={home} alt='home' />
                            <h5>38,000+</h5>
                            <h6>Homes delivered*</h6>
                        </div>
                        <div className='building'>
                            <img src={building} alt='building' />
                            <h5>50,100+</h5>
                            <h6>In planning and<br />progress*</h6>
                        </div>
                    </div>
                    <div className='cardrow2'>
                        <div className='achieve'>
                            <img src={achieve} alt='trophy' />
                            <h5>100+</h5>
                            <h6>Awards received</h6>
                        </div>
                        <div className='globe'>
                            <img src={globe} alt='globe' />
                            <h5>7</h5>
                            <h6>Countries</h6>
                        </div>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className='rightcorner'>
                    <img src={rightImage} alt="DXB Global Estates" />
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
