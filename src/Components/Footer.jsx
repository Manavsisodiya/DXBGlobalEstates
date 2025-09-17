// Footer.jsx
import "./Footer.css";
import clock from '../images/clock.png';
import email from '../images/email.png';
import location from '../images/location.png';
import phone from '../images/phone.png';
import face from '../images/facebook.png'
import insta from '../images/instagram.png'
import twit from '../images/twitter.png'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section - Logo & Description */}
                <div className="footer-left">
                    <h1 className="footer-logo">DXB Global Estates</h1>
                    <p className="footer-text">
                        Your trusted real estate partner in Dubai, specializing in off-plan
                        investments, land deals, and portfolio building for NRIs.
                        Transparent service. End-to-end support.
                    </p>
                   
                    <p className="footer-social-text">Follow Us on Social Media</p>
                    <div className="social-icons">
                        <a href="/" aria-label="Facebook">
                            <img alt="Facebook" src={face} />
                        </a>
                        <a href="/" aria-label="Instagram">
                            <img alt="Instagram" src={insta} />
                        </a>
                        <a href="/" aria-label="Twitter">
                            <img alt="Twitter" src={twit} />
                        </a>
                    </div>
                </div>

                {/* Middle Section - Navigation */}
                <div className="footer-middle">
                    <h3>NAVIGATE</h3>
                    <nav>
                        <ul>
                            <li><a href="#home">HOME</a></li>
                            <li><a href="#services">SERVICES</a></li>
                            <li><a href="#about">ABOUT US</a></li>
                            <li><a href="#team">OUR TEAM</a></li>
                            <li><a href="#contact">CONTACT US</a></li>
                        </ul>
                    </nav>
                    <div className="footer-links">
                        <a href="/" className="footer-link">Privacy Policy</a>
                        <a href="/" className="footer-link">Accessibility Statement</a>
                    </div>
                </div>

                {/* Right Section - Contact */}
                <div className="footer-right">
                    <h3>CONTACT US</h3>
                    <div className="contact-item">
                        <img alt="Business hours" src={clock} />
                        <span>Monday - Saturday, <br /> 10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="contact-item">
                        <img alt="Phone" src={phone} />
                        <a href="tel:+18323560110">+1 832-356-0110</a>
                    </div>
                    <div className="contact-item">
                        <img alt="Email" src={email} />
                        <a href="mailto:contact@dxbglobalestates.com">contact@dxbglobalestates.com</a>
                    </div>
                    <div className="contact-item">
                        <img alt="Location" src={location} />
                        <span>Regency Square,<br/>6200 Savoy Drive Suite #130,<br/> Houston, TX 77036</span>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© 2025 by DXB Global Estates</p>
            </div>
        </footer>
    );
}

export default Footer;