// Team.jsx
import './Team.css';
import mem1 from '../images/profile.jpg'
import face from '../images/facebook.png'
import insta from '../images/instagram.png'
import twit from '../images/twitter.png'

function Team() {
  return (
    <div className='Team' id='team'>
      <p className='teamheadp'>Meet The Team</p>
      
      <div className='teamsec'>
        <div className='mem'>
          <div className='member-image-container'>
            <img className='memberimg' src={mem1} alt='Munawar - Luxury Real Estate Consultant' />
          </div>
          
          <div className='textdiv2'>
            <h2>Munawar</h2>
            <p>Luxury Real Estate Consultant</p>
            <h4>
              Munawar is a highly experienced real estate consultant based in the United Arab Emirates, 
              specializing in luxury properties, off-plan investments, and high-return opportunities 
              across Dubai, Abu Dhabi, and the wider UAE market. With a deep knowledge of local real 
              estate trends and a strong network of developers and investors, he provides strategic 
              guidance tailored to each client's goals.
            </h4>
            <div className='socialicons'>
              <a href="/" aria-label="Munawar's Facebook profile">
                <img alt='Facebook' src={face} />
              </a>
              <a href="/" aria-label="Munawar's Instagram profile">
                <img alt='Instagram' src={insta} />
              </a>
              <a href="/" aria-label="Munawar's Twitter profile">
                <img alt='Twitter' src={twit} />
              </a>
            </div>
          </div>
        </div>

        <div className='mem'>
          <div className='member-image-container'>
            <img className='memberimg' src={mem1} alt='Zain - Luxury & Investment Property Specialist' />
          </div>
          
          <div className='textdiv2'>
            <h2>Zain</h2>
            <p>Luxury & Investment Property Specialist</p>
            <h4>
              Zain is a trusted and accomplished real estate consultant in the United Arab Emirates, 
              known for delivering exceptional value and strategic insight in the luxury and investment 
              property sector. With a proven track record across Dubai, Abu Dhabi, and the broader UAE 
              market, he specializes in high-end residential, off-plan developments, and income-generating 
              assets for discerning clients.
            </h4>
            <div className='socialicons'>
              <a href="/" aria-label="Zain's Facebook profile">
                <img alt='Facebook' src={face} />
              </a>
              <a href="/" aria-label="Zain's Instagram profile">
                <img alt='Instagram' src={insta} />
              </a>
              <a href="/" aria-label="Zain's Twitter profile">
                <img alt='Twitter' src={twit} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;