import React, { useState } from "react";
import { translations } from "../utils/translations";

const Contact = ({ language = "en" }) => {
  const t = translations[language] || translations.en;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(t.contact.success);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  console.log("Contact component rendering");

  return (
    <div
      style={{
        padding: "80px 20px",
        background: "#ffffff",
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#1a202c",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        {t.contact.title}
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#4a5568",
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: "600px",
          margin: "0 auto 3rem auto",
        }}
      >
        {t.contact.subtitle}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Contact Information */}
        <div
          style={{
            background: "#f8fafc",
            padding: "2rem",
            borderRadius: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1a202c",
              marginBottom: "1rem",
            }}
          >
            {t.contact.info.title}
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                marginBottom: "0.5rem",
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#e91e63" }}>📍</span>{" "}
              {t.contact.info.ourLocation}
            </h4>
            <p style={{ color: "#4a5568", margin: "0", marginLeft: "32px" }}>
              Vibgyormaple INC
              <br />
              AB,CA
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                marginBottom: "0.5rem",
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#e91e63" }}>📞</span>{" "}
              {t.contact.info.phoneNumbers}
            </h4>
            <p style={{ color: "#4a5568", margin: "0", marginLeft: "32px" }}>
              <a
                href="tel:+1-639-590-9729"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                +1 639 590 9729
              </a>
            </p>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "0.5rem",
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#e91e63" }}>✉️</span>{" "}
              {t.contact.info.emailAddresses}
            </h4>
            <p style={{ color: "#4a5568", margin: "0", marginLeft: "32px" }}>
              <a
                href="mailto:contact.grasshawk@gmail.com"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                contact.grasshawk@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1a202c",
              marginBottom: "1rem",
            }}
          >
            {t.contact.form.title}
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#1a202c",
                }}
              >
                {t.contact.form.name} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t.contact.form.namePlaceholder}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#1a202c",
                }}
              >
                {t.contact.form.email} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t.contact.form.emailPlaceholder}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#1a202c",
                }}
              >
                {t.contact.form.subject} *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t.contact.form.subjectPlaceholder}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#1a202c",
                }}
              >
                {t.contact.form.message} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder={t.contact.form.messagePlaceholder}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  resize: "vertical",
                  minHeight: "120px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "12px 24px",
                backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
            </button>

            {submitMessage && (
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
