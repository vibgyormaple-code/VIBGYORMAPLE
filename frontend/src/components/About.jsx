import React from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../utils/translations";
import "./About.css";
import aboutImage from "../assets/about_us_bg.png";

const About = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();

  return (
    <section className="about-section">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>{t.about.title}</h1>
        </div>
      </div>
      
      {/* Mission & Vision Section */}
      <div className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
          </div>
          <h3>{t.about.mission.title}</h3>
              </div>
              <p>
                {t.about.mission.description}
              </p>
            </div>
            <div className="mission-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <h3>{t.about.vision.title}</h3>
              </div>
          <p>
            {t.about.vision.description}
          </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>{t.about.story.title}</h2>
              <p>
                {t.about.story.paragraph1}
              </p>
              <p>
                {t.about.story.paragraph2}
              </p>
              <div className="story-stats">
                <div className="story-stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">{t.about.story.yearsExperience}</div>
                </div>
                <div className="story-stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">{t.about.story.canadianSupport}</div>
                </div>
                <div className="story-stat">
                  <div className="stat-number">1,000+</div>
                  <div className="stat-label">{t.about.story.backyardsProtected}</div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src={aboutImage} alt="VIBGYOR Maple Company" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="container">
          <h2 className="section-title">{t.about.values.title}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1h-2.5l-1.5-3h-8l-1.5 3H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1"/>
                </svg>
              </div>
              <h4>{t.about.values.quality}</h4>
              <p>{t.about.values.qualityDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h4>{t.about.values.innovation}</h4>
              <p>{t.about.values.innovationDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4>{t.about.values.trust}</h4>
              <p>{t.about.values.trustDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>{t.about.values.sustainability}</h4>
              <p>{t.about.values.sustainabilityDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h3>{t.about.cta.title}</h3>
            <p>{t.about.cta.description}</p>
            <button className="cta-button" onClick={() => navigate('/products')}>
              {t.about.cta.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
