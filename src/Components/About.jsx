import './About.css';
import about from '../images/about1.jpg'
function About() {
    return (
        <div className='about' id='about'>
            <div className='imgdiv'>
                <img alt='about' src={about}/>
            </div>
            <div className='textdiv'>
                <h2 className='abouth2'>About <span style={{color:"#f07c2e",fontWeight:'550'}}>DXB Global Estates</span></h2>
                <h3 className='abouth3'>At DXB Global Estates, we bring over 20 years of expertise in the dynamic real estate
                    market of Dubai. As a proud part of the Skynet Group of Companies, we have built a strong
                    reputation for excellence, integrity, and innovation in property buying, selling, and
                    development. <br/><br/>

                    Our journey began in the heart of Dubai, where we’ve successfully delivered
                    and collaborated on landmark projects with some of the most prestigious names in the
                    industry, including Damac Properties, Seven Seas Constructions, Sobha Properties, Park
                    Group, and BT Properties. Our consistent track record of achievement in both residential
                    and commercial real estate has positioned us as a trusted partner in the UAE market.<br/><br/> 

                    With our continued success and vision for growth, we have now expanded our operations into the
                    United States, bringing our proven model and commitment to quality to an international
                    stage. Whether you're an investor, a buyer, or a development partner, DXB Global Estates
                    offers unmatched experience, insight, and dedication to delivering long-term value.
                    </h3>
                    
            </div>
        </div>
    );
}

export default About;
