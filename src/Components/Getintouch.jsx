import './Getintouch.css';
import clock from '../images/clock.png';
import location from '../images/location.png';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Getintouch() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        subject: "",
        message: "",
        contactMethod: [],
        heardFrom: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    // Popular country codes for real estate inquiries - FIXED DUPLICATE +1 ISSUE
    const countryCodes = [
        { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
        { code: "+355", country: "Albania", flag: "🇦🇱" },
        { code: "+213", country: "Algeria", flag: "🇩🇿" },
        { code: "+1", country: "United States/Canada", flag: "🇺🇸🇨🇦" }, // FIXED: Combined US/Canada
        { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
        { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
        { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
        { code: "+91", country: "India", flag: "🇮🇳" },
        { code: "+92", country: "Pakistan", flag: "🇵🇰" },
        { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
        { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
        { code: "+977", country: "Nepal", flag: "🇳🇵" },
        { code: "+86", country: "China", flag: "🇨🇳" },
        { code: "+81", country: "Japan", flag: "🇯🇵" },
        { code: "+82", country: "South Korea", flag: "🇰🇷" },
        { code: "+65", country: "Singapore", flag: "🇸🇬" },
        { code: "+60", country: "Malaysia", flag: "🇲🇾" },
        { code: "+62", country: "Indonesia", flag: "🇮🇩" },
        { code: "+63", country: "Philippines", flag: "🇵🇭" },
        { code: "+66", country: "Thailand", flag: "🇹🇭" },
        { code: "+84", country: "Vietnam", flag: "🇻🇳" },
        { code: "+61", country: "Australia", flag: "🇦🇺" },
        { code: "+64", country: "New Zealand", flag: "🇳🇿" },
        { code: "+49", country: "Germany", flag: "🇩🇪" },
        { code: "+33", country: "France", flag: "🇫🇷" },
        { code: "+39", country: "Italy", flag: "🇮🇹" },
        { code: "+34", country: "Spain", flag: "🇪🇸" },
        { code: "+31", country: "Netherlands", flag: "🇳🇱" },
        { code: "+41", country: "Switzerland", flag: "🇨🇭" },
        { code: "+46", country: "Sweden", flag: "🇸🇪" },
        { code: "+47", country: "Norway", flag: "🇳🇴" },
        { code: "+45", country: "Denmark", flag: "🇩🇰" },
        { code: "+358", country: "Finland", flag: "🇫🇮" },
        { code: "+7", country: "Russia", flag: "🇷🇺" },
        { code: "+380", country: "Ukraine", flag: "🇺🇦" },
        { code: "+48", country: "Poland", flag: "🇵🇱" },
        { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
        { code: "+36", country: "Hungary", flag: "🇭🇺" },
        { code: "+40", country: "Romania", flag: "🇷🇴" },
        { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
        { code: "+385", country: "Croatia", flag: "🇭🇷" },
        { code: "+381", country: "Serbia", flag: "🇷🇸" },
        { code: "+27", country: "South Africa", flag: "🇿🇦" },
        { code: "+20", country: "Egypt", flag: "🇪🇬" },
        { code: "+234", country: "Nigeria", flag: "🇳🇬" },
        { code: "+254", country: "Kenya", flag: "🇰🇪" },
        { code: "+233", country: "Ghana", flag: "🇬🇭" },
        { code: "+55", country: "Brazil", flag: "🇧🇷" },
        { code: "+54", country: "Argentina", flag: "🇦🇷" },
        { code: "+56", country: "Chile", flag: "🇨🇱" },
        { code: "+57", country: "Colombia", flag: "🇨🇴" },
        { code: "+52", country: "Mexico", flag: "🇲🇽" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                contactMethod: checked
                    ? [...prev.contactMethod, value]
                    : prev.contactMethod.filter((m) => m !== value)
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        // Validation
        if (formData.contactMethod.length === 0) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            alert('Please select at least one preferred contact method.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            alert('Please enter a valid email address.');
            return;
        }

        try {
            // Use environment variables for sensitive data
            const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_dg3wvcr';
            const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_72fe5kf';
            const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'B5CO7uNLmmbHCC5_i';

            // Initialize EmailJS (this should ideally be done once in your app)
            emailjs.init(publicKey);

            // Combine country code and phone number
            const fullPhoneNumber = formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided';
            
            // Find country name from code
            const selectedCountry = countryCodes.find(country => country.code === formData.countryCode);
            const countryName = selectedCountry ? selectedCountry.country : 'Unknown';

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: fullPhoneNumber,
                country_code: formData.countryCode,
                country_name: countryName,
                phone_number: formData.phone || 'Not provided',
                subject: formData.subject,
                message: formData.message || 'No additional message',
                contact_method: formData.contactMethod.join(', '),
                heard_from: formData.heardFrom || 'Not specified',
                to_email: 'contact@dxbglobalestates.com',
                // Add timestamp for tracking
                timestamp: new Date().toLocaleString()
            };

            console.log('Attempting to send email with params:', templateParams);

            const response = await emailjs.send(
                serviceID,
                templateID,
                templateParams
            );

            console.log('EmailJS response:', response);

            if (response.status === 200) {
                setSubmitStatus('success');
                setFormData({
                    name: "",
                    email: "",
                    countryCode: "+971",
                    phone: "",
                    subject: "",
                    message: "",
                    contactMethod: [],
                    heardFrom: ""
                });
                alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
            } else {
                throw new Error(`EmailJS returned status: ${response.status}`);
            }
        } catch (error) {
            console.error('Detailed error sending email:', error);
            setSubmitStatus('error');
            
            // More specific error messages based on common EmailJS errors
            let errorMessage = 'Sorry, there was an error sending your message. ';
            
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
            
            errorMessage += 'If the problem persists, please contact us directly at contact@dxbglobalestates.com';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='Getintouch' id='contact'>
            {/* Left Info Section */}
            <div className='touchsec'>
                <h2>Get in Touch</h2>
                <h3>
                    At DXB Global Estates, we are more than just a real estate firm. We
                    are driven by passion, grounded in integrity, and dedicated to
                    connecting people with exceptional properties across Dubai.<br /><br />
                    Whether you're finding your dream home or seeking high value
                    investments, we stand beside you at every step — delivering
                    excellence, trust, and a vision for your future.
                </h3>
                
                <div className='contact-info'>
                    <div className='logotxtmix'>
                        <img src={clock} alt='Business hours' />
                        <h5>Monday - Saturday,<br />10:00 AM - 6:00 PM</h5>
                    </div>
                    
                    <div className='logotxtmix'>
                        <img src={location} alt='Location' />
                        <h5>
                            Regency Square, 6200 Savoy Drive Suite #130, Houston, TX 77036
                        </h5>
                    </div>
                </div>
            </div>

            <div className='linediv'></div>

            {/* Right Form Section */}
            <div className='formsec'>
                <h2>Contact Us</h2>
                <h3>Have a question or feedback? We're here to help! <br /> Fill out the form below and our team will be in touch shortly.</h3>

                <form onSubmit={handleSubmit}>
                    <div className="formrow">
                        <div className="formgroup">
                            <label>Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="formgroup">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="formgroup">
                        <label>Phone</label>
                        <div className="phone-input-group">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="country-code-select"
                                disabled={isSubmitting}
                            >
                                {countryCodes.map((country) => (
                                    <option key={`${country.code}-${country.country}`} value={country.code}>
                                        {country.flag} {country.code} ({country.country})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="phone-number-input"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="formgroup">
                        <label>Subject *</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        >
                            <option value="">Select an option</option>
                            <option value="buying">Buying Inquiry</option>
                            <option value="selling">Selling Inquiry</option>
                            <option value="valuation">Property Valuation</option>
                            <option value="general">General Question</option>
                        </select>
                    </div>

                    <div className="formgroup">
                        <label>Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your requirements..."
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    <div className="formgroup">
                        <label>Preferred Contact Method *</label>
                        <div className="checkboxgroup">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="contactMethod" 
                                    value="email" 
                                    checked={formData.contactMethod.includes('email')}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                /> 
                                Email
                            </label>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="contactMethod" 
                                    value="phone" 
                                    checked={formData.contactMethod.includes('phone')}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                /> 
                                Phone
                            </label>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="contactMethod" 
                                    value="text" 
                                    checked={formData.contactMethod.includes('text')}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                /> 
                                Text Message
                            </label>
                        </div>
                    </div>

                    <div className="formgroup">
                        <label>How did you hear about us?</label>
                        <input
                            type="text"
                            name="heardFrom"
                            value={formData.heardFrom}
                            onChange={handleChange}
                            placeholder="Optional - e.g., Google search, referral, social media..."
                            disabled={isSubmitting}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submitbtn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Getintouch;