import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./EnquiryPopup.css";

const EnquiryPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    lookingTo: "",
    planToBuy: "",
    newsOffers: false,
    privacyPolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacyPolicy) {
      alert("Please accept the Privacy Policy to continue.");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_dg3wvcr';
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_pzrxphm';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'B5CO7uNLmmbHCC5_i';

      // Initialize EmailJS
      emailjs.init(publicKey);

      const fullPhoneNumber = formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided';
      
      const countryMap = {
        "+91": "India",
        "+971": "United Arab Emirates", 
        "+1": "United States/Canada",
        "+44": "United Kingdom"
      };
      const countryName = countryMap[formData.countryCode] || 'Unknown';

      const templateParams = {
        from_name: `${formData.title} ${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        phone: fullPhoneNumber,
        country_code: formData.countryCode,
        country_name: countryName,
        phone_number: formData.phone || 'Not provided',
        subject: 'New Interest Registration - Enquiry Popup',
        message: `
Interest Registration Details:
- Looking to: ${formData.lookingTo || 'Not specified'}
- Plan to buy: ${formData.planToBuy || 'Not specified'}
- News/Offers subscription: ${formData.newsOffers ? 'Yes' : 'No'}
- Privacy Policy accepted: ${formData.privacyPolicy ? 'Yes' : 'No'}
        `.trim(),
        contact_method: 'Email', 
        heard_from: 'Website Enquiry Popup',
        to_email: 'info@dxbglobalestates.com', 
       
        timestamp: new Date().toLocaleString(),
        
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        looking_to: formData.lookingTo || 'Not specified',
        plan_to_buy: formData.planToBuy || 'Not specified',
        news_offers: formData.newsOffers ? 'Yes' : 'No',
        privacy_policy: formData.privacyPolicy ? 'Accepted' : 'Not accepted'
      };

      console.log('Attempting to send enquiry email with params:', templateParams);

      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryCode: "+1",
          lookingTo: "",
          planToBuy: "",
          newsOffers: false,
          privacyPolicy: false,
        });
        alert('Thank you for your interest! Your enquiry has been sent successfully. We will get back to you soon.');
        onClose(); 
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('Detailed error sending enquiry email:', error);
      setSubmitStatus('error');
      
      
      let errorMessage = 'Sorry, there was an error sending your enquiry. ';
      
      if (error.text) {
        console.error('EmailJS error text:', error.text);
        if (error.text.includes('Invalid template ID') || error.text.includes('template')) {
          errorMessage += 'Email template configuration issue. ';
        } else if (error.text.includes('Invalid service ID') || error.text.includes('service')) {
          errorMessage += 'Email service configuration issue. ';
        } else if (error.text.includes('Invalid user ID') || error.text.includes('user') || error.text.includes('public key')) {
          errorMessage += 'Email authentication issue. ';
        } else if (error.text.includes('rate limit') || error.text.includes('limit')) {
          errorMessage += 'Too many requests. Please wait a moment and try again. ';
        } else if (error.text.includes('network') || error.text.includes('connection')) {
          errorMessage += 'Network connection issue. Please check your internet and try again. ';
        } else {
          errorMessage += 'Please check your internet connection and try again. ';
        }
      } else if (error.message) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage += 'Network connection issue. Please check your internet and try again. ';
        } else {
          errorMessage += `Technical error: ${error.message}. `;
        }
      }
      
      errorMessage += 'If the problem persists, please contact us directly at info@dxbglobalestates.com';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="popup-container">
        <button className="popup-close-btn" onClick={onClose}>
          ×
        </button>
        <p></p>
        <h2 style={{marginTop:"0rem",color:'black',textAlign:"center",marginBottom:"0.5rem"}}>REGISTER YOUR INTEREST</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-select"
              required
              disabled={isSubmitting}
            >
              <option value="">Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <div className="phone-container">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-select"
                disabled={isSubmitting}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="phone-input"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="radio-group">
              <p className="radio-label">Are you looking to</p>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lookingTo"
                    value="invest"
                    checked={formData.lookingTo === "invest"}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Invest</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="lookingTo"
                    value="find-job"
                    checked={formData.lookingTo === "find-job"}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Find a job</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="radio-group">
              <p className="radio-label">When do you plan to buy ?</p>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planToBuy"
                    value="30-days"
                    checked={formData.planToBuy === "30-days"}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Within 30 days</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planToBuy"
                    value="90-days"
                    checked={formData.planToBuy === "90-days"}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Within 90 days</span>
                </label>
              </div>
            </div>
          </div>

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsOffers"
                checked={formData.newsOffers}
                onChange={handleChange}
                className="checkbox-input"
                disabled={isSubmitting}
              />
              <span className="checkbox-text">
                I'd like to hear about news and offers
              </span>
            </label>
          </div>

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                className="checkbox-input"
                required
                disabled={isSubmitting}
              />
              <span className="checkbox-text">
                I have read and agree to the <a href="#" className="privacy-link">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SENDING...' : 'ENQUIRE NOW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup;  