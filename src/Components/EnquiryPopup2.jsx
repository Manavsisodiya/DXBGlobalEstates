import { useState, useEffect } from "react";
import "./EnquiryPopup.css";

/**
 * EnquiryPopup2 — pure-code email (PHP) sender for the "Know More" button.
 * - In dev (localhost), it POSTs to your live domain automatically.
 * - In prod, it POSTs relative to the same domain.
 * - If /api/knowmore-enquiry.php is blocked (405/404), it falls back to /knowmore-enquiry.php.
 */
const PROD_BASE = "https://dxbglobalestates.com";

const isLocalHost = () =>
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const BASE = isLocalHost() ? PROD_BASE : ""; // use live domain while running locally

const EnquiryPopup2 = ({ isOpen, onClose, projectName = "Ajman Creek Towers" }) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+971",
    lookingTo: "",
    planToBuy: "",
    newsOffers: false,
    privacyPolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const postJSON = async (path, payload) => {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.privacyPolicy) {
      alert("Please accept the Privacy Policy to continue.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { ...formData, projectName };

      // 1) Try /api path first
      let res = await postJSON("/api/knowmore-enquiry.php", payload);

      // 2) If blocked or missing, try root file
      if (res.status === 404 || res.status === 405) {
        res = await postJSON("/knowmore-enquiry.php", payload);
      }

      // 3) Parse JSON and validate
      let json = {};
      try { json = await res.json(); } catch (_) {}
      if (!res.ok || !json.ok) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }

      // success
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "+971",
        lookingTo: "",
        planToBuy: "",
        newsOffers: false,
        privacyPolicy: false,
      });
      alert("Thank you! Your enquiry has been sent. Please check your email for our acknowledgement.");
      onClose();
    } catch (err) {
      console.error("Know More submit error:", err);
      alert("Sorry, something went wrong sending your enquiry. Please try again or email us at info@dxbglobalestates.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="popup-container" role="dialog" aria-modal="true" aria-labelledby="km-title">
        <button className="popup-close-btn" onClick={onClose} aria-label="Close">×</button>
        <h2 id="km-title" style={{ marginTop: 0, color: "black", textAlign: "center", marginBottom: "0.5rem" }}>
          REGISTER YOUR INTEREST
        </h2>

        <form onSubmit={handleSubmit} noValidate>
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
                <option value="+971">🇦🇪 +971</option>
                <option value="+91">🇮🇳 +91</option>
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
              <span className="checkbox-text">I'd like to hear about news and offers</span>
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
                I have read and agree to the{" "}
                <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "SENDING..." : "ENQUIRE NOW"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup2;
