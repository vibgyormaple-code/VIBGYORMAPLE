import React from 'react';
import './LanguageToggle.css';

const LanguageToggle = ({ language, setLanguage }) => {
  return (

    <div className="language-toggle">
      <button 
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button 
        className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
