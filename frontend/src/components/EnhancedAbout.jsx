
import React from 'react';
import './About.css';

const EnhancedAbout = () => {
  return (
    <section className="about-section section-enhanced" id="about">
      <div className="container">
        <div className="about-content scroll-reveal">
          <h2 className="heading-secondary text-center">About Grass Hawk</h2>
          
          <div className="about-grid">
            <div className="about-text">
              <h3 className="heading-tertiary">Our Mission</h3>
              <p className="text-justified">
                Grass Hawk is revolutionizing agricultural pest management through innovative, 
                sustainable solutions that empower farmers worldwide. Our commitment extends 
                beyond mere product development – we are dedicated to creating comprehensive 
                ecosystems that enhance agricultural productivity while preserving environmental 
                integrity. By seamlessly integrating cutting-edge technology with time-tested 
                agricultural wisdom, we deliver tools that not only solve immediate challenges 
                but also contribute to long-term sustainable farming practices.
              </p>
              
              <p className="text-justified">
                Our approach centers on understanding the intricate relationships between crops, 
                soil health, and pest management. We believe that effective pest control should 
                never come at the expense of environmental sustainability or crop quality. 
                Through extensive research and development, we have engineered solutions that 
                work in harmony with natural ecosystems, ensuring that farmers can achieve 
                optimal yields while maintaining the delicate balance of their agricultural 
                environments.
              </p>
            </div>
            
            <div className="about-text">
              <h3 className="heading-tertiary">Our Innovation</h3>
              <p className="text-justified">
                At the heart of Grass Hawk's innovation lies our flagship product – the 
                Advanced Mole Trap System. This revolutionary device represents the culmination 
                of years of research in underground pest behavior, precision engineering, and 
                sustainable agricultural practices. Unlike conventional pest control methods 
                that often rely on harmful chemicals or ineffective mechanical solutions, our 
                system employs sophisticated sensor technology and precision targeting to 
                eliminate underground pests with unprecedented accuracy and minimal environmental 
                impact.
              </p>
              
              <p className="text-justified">
                Our team comprises agricultural scientists, mechanical engineers, and 
                sustainability experts who work collaboratively to address real-world farming 
                challenges. Each solution undergoes rigorous testing in diverse agricultural 
                environments to ensure reliability, effectiveness, and user-friendliness. 
                We pride ourselves on creating tools that not only solve immediate problems 
                but also contribute to the broader goal of sustainable agriculture and food 
                security for future generations.
              </p>
            </div>
          </div>
          
          <div className="about-features scroll-reveal">
            <h3 className="heading-tertiary text-center">Why Choose Grass Hawk?</h3>
            <div className="features-grid">
              <div className="feature-card card hover-lift">
                <div className="feature-icon">🌱</div>
                <h4>Eco-Friendly Solutions</h4>
                <p>All our products are designed with environmental sustainability as a core principle, ensuring minimal ecological impact.</p>
              </div>
              
              <div className="feature-card card hover-lift">
                <div className="feature-icon">⚙️</div>
                <h4>Precision Engineering</h4>
                <p>Advanced technology ensures accurate targeting and effective pest control without collateral damage.</p>
              </div>
              
              <div className="feature-card card hover-lift">
                <div className="feature-icon">👨‍🌾</div>
                <h4>Farmer-Centric Design</h4>
                <p>Every solution is developed with direct input from farmers to ensure practical, user-friendly implementation.</p>
              </div>
              
              <div className="feature-card card hover-lift">
                <div className="feature-icon">📈</div>
                <h4>Proven Results</h4>
                <p>Our solutions have demonstrated significant improvements in crop yields and pest management effectiveness.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .about-content {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin: 2rem 0;
        }
        
        .text-justified {
          text-align: justify;
          text-justify: inter-word;
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .feature-card {
          text-align: center;
          padding: 2rem;
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default EnhancedAbout;
