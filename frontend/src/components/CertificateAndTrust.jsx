import React from "react";
import { translations } from "../utils/translations";
import "./CertificateAndTrust.css";
import logoVibgyor from "../assets/logo_vibgyor.png";
import canadaGovLogo from "../assets/new_canada_gov_logo.jpg";

const CertificateAndTrust = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  return (
    <section className="certifications-trust-section">
      <div className="bubble-animation">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <h1>{t.certificate.title}</h1>
      <p className="subtitle">
        {t.certificate.subtitle}
      </p>
      <div className="certifications-cards">
        <div className="cert-card">
          <div className="icon shield-icon"></div>
          <h3>{t.certificate.cards.healthCanada.title}</h3>
          <p>{t.certificate.cards.healthCanada.description}</p>
        </div>
        <div className="cert-card">
          <div className="icon leaf-icon"></div>
          <h3>{t.certificate.cards.ecoLogo.title}</h3>
          <p>{t.certificate.cards.ecoLogo.description}</p>
        </div>
        <div className="cert-card">
          <div className="icon ribbon-icon"></div>
          <h3>{t.certificate.cards.iso.title}</h3>
          <p>{t.certificate.cards.iso.description}</p>
        </div>
        <div className="cert-card">
          <div className="icon location-icon">
            <img src={canadaGovLogo} alt="Canada Government Logo" className="canada-logo" />
          </div>
          <h3>{t.certificate.cards.canadianMade.title}</h3>
          <p>{t.certificate.cards.canadianMade.description}</p>
        </div>
      </div>
      <section className="quality-assurance-section">
        <h2>{t.certificate.qualityAssurance.title}</h2>
        <p>
          {t.certificate.qualityAssurance.description}
        </p>
      </section>
      <section className="registered-design-section">
        <div className="registered-design-card">
          <div className="registered-design-logo">
            <img src={canadaGovLogo} alt="Canada Government Logo" className="canada-gov-logo" />
          </div>
          <p>
            {t.certificate.registeredDesign.description}
          </p>
        </div>
      </section>
    </section>
  );
};

export default CertificateAndTrust;
