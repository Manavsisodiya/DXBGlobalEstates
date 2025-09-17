import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contactsub.css";
import car1 from "../Subcomponents/subimages/ExteriorRenders/ajman4.jpg";
import whatsapp from "../Subcomponents/subimages/whatsapp.png";

export default function Contactsub() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1", 
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const countryCodes = [
    { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
    { code: "+355", country: "Albania", flag: "🇦🇱" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
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
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "First name is required";
    if (!form.lastName.trim()) er.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "Enter a valid email";
    if (!/^[0-9]{7,15}$/.test(form.phone))
      er.phone = "Enter a valid phone number";
    if (!form.message.trim()) er.message = "Please add a short message";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Prefer .env, but keep safe fallbacks (match your Getintouch)
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_dg3wvcr";
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_72fe5kf";
      const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || "B5CO7uNLmmbHCC5_i";

      emailjs.init(publicKey);

      const fullPhone = `${form.countryCode} ${form.phone}`;
      const selectedCountry = countryCodes.find(c => c.code === form.countryCode);
      const countryName = selectedCountry ? selectedCountry.country : "Unknown";

      // Map fields similar to Getintouch so the same EmailJS template can work
      const templateParams = {
        // names
        first_name: form.firstName,
        last_name: form.lastName,
        from_name: `${form.firstName} ${form.lastName}`,
        // email + phone
        from_email: form.email,
        phone: fullPhone,
        country_code: form.countryCode,
        country_name: countryName,
        phone_number: form.phone,
        // message
        subject: "Contact (Ajman page)",
        message: form.message || "No additional message",
        // meta
        page: typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toLocaleString(),
        to_email: "contact@dxbglobalestates.com",
      };

      const res = await emailjs.send(serviceID, templateID, templateParams);

      if (res.status === 200) {
        setSubmitStatus("success");
        alert("Thank you! Your message has been sent successfully. We will get back to you soon.");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+971",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error(`EmailJS returned status ${res.status}`);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      alert(
        "Sorry, there was an error sending your message. Please try again, or email us directly at contact@dxbglobalestates.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="cs-wrap" aria-labelledby="contact-heading">
      <div className="cs-container">
        <h1 id="contact-heading" className="cs-title">Contact Us</h1>

        <div className="cs-grid">
          {/* Left visual */}
          <figure className="cs-visual">
            <img src={car1} alt="Modern residential tower with pool" loading="lazy" />
          </figure>

          {/* Right form */}
          <form className="cs-form" onSubmit={handleSubmit} noValidate>
            <p className="cs-lead">Fill out the form and we will get back to you</p>

            <div className="cs-two">
              <div className="cs-field">
                <label htmlFor="firstName">First Name<span aria-hidden="true">*</span></label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter Your First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  aria-invalid={!!errors.firstName}
                  aria-describedby="err-firstName"
                  disabled={isSubmitting}
                />
                {errors.firstName && <span className="cs-error" id="err-firstName">{errors.firstName}</span>}
              </div>

              <div className="cs-field">
                <label htmlFor="lastName">Last Name<span aria-hidden="true">*</span></label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Your Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  aria-invalid={!!errors.lastName}
                  aria-describedby="err-lastName"
                  disabled={isSubmitting}
                />
                {errors.lastName && <span className="cs-error" id="err-lastName">{errors.lastName}</span>}
              </div>
            </div>

            <div className="cs-two">
              <div className="cs-field">
                <label htmlFor="email">Email<span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby="err-email"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="cs-error" id="err-email">{errors.email}</span>}
              </div>

              <div className="cs-field">
                <label htmlFor="phone">Phone Number<span aria-hidden="true">*</span></label>
                <div className="cs-iti-row">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="cs-iti-select"
                    aria-label="Country code"
                    disabled={isSubmitting}
                  >
                    {countryCodes.map((c) => (
                      <option key={`${c.code}-${c.country}`} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter Your Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby="err-phone"
                    className="cs-underline-input flex"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && <span className="cs-error" id="err-phone">{errors.phone}</span>}
              </div>
            </div>

            <div className="cs-field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter Your Message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby="err-message"
                disabled={isSubmitting}
              />
              {errors.message && <span className="cs-error" id="err-message">{errors.message}</span>}
            </div>

            <hr className="cs-divider" />

            <div className="cs-actions">
              <button type="submit" className={`cs-btn ${isSubmitting ? "submitting" : ""}`} aria-label="Submit" disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/971000000000" className="cs-wa" aria-label="Chat on WhatsApp">
        <img
          src={whatsapp}
          alt="Chat on WhatsApp"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </a>
    </section>
  );
}
